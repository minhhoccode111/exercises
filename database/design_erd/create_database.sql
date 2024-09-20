--------------------------------- POSTGRESQL -----------------------------------

-- NOTE:
-- varchar: postgres varchar support unicode by default
-- serial: postgres's auto-incrementing integer type
-- decimal(12, 2): for VND currency
-- text: for image link

-- WARN: mind about tables' drop and create order

drop table if exists don_hang cascade;
drop table if exists khach_hang cascade;
drop table if exists chi_tiet_don_hang_san_pham cascade;
drop table if exists san_pham cascade;
drop table if exists nha_cung_cap_san_pham cascade;
drop table if exists danh_muc_san_pham cascade;
drop table if exists nha_cung_cap cascade;
drop table if exists danh_muc cascade;

-- table nha_cung_cap
create table nha_cung_cap (
    ma_nha_cung_cap         serial primary key,
    ten_nha_cung_cap        varchar(50) not null,
    so_dien_thoai           varchar(15) unique not null,
    dia_chi                 varchar(250)
);

-- table san_pham
create table san_pham (
    ma_san_pham             serial primary key,
    ten_san_pham            varchar(50) not null,
    mo_ta                   varchar(250),
    gia_ban                 decimal(12, 2) not null,
    so_luong_ton_kho        integer not null,
    hinh_anh                text,

    constraint chk_gia_ban check (gia_ban > 0),
    constraint chk_so_luong_ton_kho check (so_luong_ton_kho >= 0)
);

-- junction table nha_cung_cap_san_pham
create table nha_cung_cap_san_pham (
    ma_nha_cung_cap         integer not null,
    ma_san_pham             integer not null,
    primary key(ma_nha_cung_cap, ma_san_pham),

    constraint fk_nha_cung_cap foreign key(ma_nha_cung_cap)
    references nha_cung_cap(ma_nha_cung_cap) on delete restrict on update cascade,

    constraint fk_san_pham foreign key(ma_san_pham)
    references san_pham(ma_san_pham) on delete cascade on update cascade
);

-- table danh_muc
create table danh_muc (
    ma_danh_muc             serial primary key,
    ten_danh_muc            varchar(50) not null
);

-- junction table danh_muc_san_pham
create table danh_muc_san_pham (
    ma_san_pham             integer not null,
    ma_danh_muc             integer not null,
    primary key(ma_san_pham, ma_danh_muc),

    constraint fk_san_pham foreign key(ma_san_pham)
    references san_pham(ma_san_pham) on delete cascade on update cascade,

    constraint fk_danh_muc foreign key(ma_danh_muc)
    references danh_muc(ma_danh_muc) on delete restrict on update cascade
);

-- table khach_hang
create table khach_hang (
    ma_khach_hang           serial primary key,
    ten_khach_hang          varchar(50) not null,
    dia_chi                 varchar(250),
    so_dien_thoai           varchar(15) unique not null,
    email                   varchar(50) unique not null,
    mat_khau                varchar(128) not null -- hashed password max length
);

-- table don_hang
create table don_hang (
    ma_don_hang             serial primary key,
    ma_khach_hang           integer not null,
    ngay_dat_hang           date not null,
    ngay_giao_hang          date,
    tong_tien               decimal(12, 2) not null,
    trang_thai_don_hang     varchar(12) default 'Đang xử lý',
    phuong_thuc_thanh_toan  varchar(50) not null,

    constraint fk_khach_hang foreign key(ma_khach_hang)
    references khach_hang(ma_khach_hang) on delete restrict on update cascade,

    constraint chk_tong_tien check (tong_tien > 0),
    -- will not trigger if ngay_giao_hang is null
    constraint chk_ngay check (ngay_giao_hang >= ngay_dat_hang),
    constraint chk_trang_thai check (
        trang_thai_don_hang in ('Đang xử lý', 'Đã giao hàng', 'Đã hủy')
    )
);

-- table chi_tiet_don_hang_san_pham
create table chi_tiet_don_hang_san_pham (
    ma_san_pham             integer not null,
    ma_don_hang             integer not null,
    don_gia                 decimal(12, 2) not null,
    so_luong                integer not null,
    primary key(ma_san_pham, ma_don_hang),

    constraint fk_san_pham foreign key(ma_san_pham)
    references san_pham(ma_san_pham) on delete restrict on update cascade,

    constraint fk_don_hang foreign key(ma_don_hang)
    references don_hang(ma_don_hang) on delete cascade on update cascade,

    constraint chk_don_gia check (don_gia > 0),
    constraint chk_so_luong check (so_luong > 0)
);

--------------------------------- INDEXES --------------------------------------
-- indexes for san_pham table
create index idx_san_pham_ten on san_pham(ten_san_pham);
create index idx_san_pham_gia_ban on san_pham(gia_ban);
create index idx_san_pham_so_luong_ton_kho on san_pham(so_luong_ton_kho);

-- indexes for nha_cung_cap table
create index idx_nha_cung_cap_ten on nha_cung_cap(ten_nha_cung_cap);

-- indexes for danh_muc table
create index idx_danh_much_ten on danh_muc(ten_danh_muc);

-- indexes for khach_hang table
create index idx_khach_hang_ten on khach_hang(ten_khach_hang);

-- indexes for don_hang table
create index idx_don_hang_ma_khach_hang on don_hang(ma_khach_hang);
create index idx_don_hang_ngay_dat_hang on don_hang(ngay_dat_hang);
create index idx_don_hang_tong_tien on don_hang(tong_tien);
create index idx_don_hang_trang_thai on don_hang(trang_thai_don_hang);

-- NOTE: primary keys and unique constraints automatically create indexes in postgres
-- like khach_hang.email
-- like khach_hang.so_dien_thoai
-- like nha_cung_cap.so_dien_thoai

--------------------------------- TRIGGERS -------------------------------------

-- not allow directly update primary keys in junction tables like:
-- nha_cung_cap_san_pham, danh_muc_san_pham, chi_tiet_don_hang_san_pham

-- nha_cung_cap_san_pham
create or replace function chk_pk_nha_cung_cap_san_pham()
returns trigger as $$
begin
    if OLD.ma_nha_cung_cap != NEW.ma_nha_cung_cap
    or OLD.ma_san_pham != NEW.ma_san_pham then
        raise exception 'Không được phép cập nhật khóa chính trực tiếp của bảng nhà cung cấp sản phẩm';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_chk_pk_nha_cung_cap_san_pham
after update on nha_cung_cap_san_pham
for each row execute function chk_pk_nha_cung_cap_san_pham();

-- danh_muc_san_pham
create or replace function chk_pk_danh_muc_san_pham()
returns trigger as $$
begin
    if OLD.ma_danh_muc != NEW.ma_danh_muc
    or OLD.ma_san_pham != NEW.ma_san_pham then
        raise exception 'Không được phép cập nhật khóa chính trực tiếp của bảng danh mục sản phẩm';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_chk_pk_danh_muc_san_pham
after update on danh_muc_san_pham
for each row execute function chk_pk_danh_muc_san_pham();

-- chi_tiet_don_hang_san_pham
create or replace function chk_pk_chi_tiet_don_hang_san_pham()
returns trigger as $$
begin
    if OLD.ma_don_hang != NEW.ma_don_hang
    or OLD.ma_san_pham != NEW.ma_san_pham then
        raise exception 'Không được phép cập nhật khóa chính trực tiếp của bảng chi tiết đơn hàng sản phẩm';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_chk_pk_chi_tiet_don_hang_san_pham
after update on chi_tiet_don_hang_san_pham
for each row execute function chk_pk_chi_tiet_don_hang_san_pham();

-- ensure a san_pham has at least 1 nha_cung_cap and 1 danh_muc when insert
create or replace function chk_san_pham()
returns trigger as $$
begin
    if not exists (select 1 from nha_cung_cap_san_pham where ma_san_pham = NEW.ma_san_pham) then
        raise exception 'Một sản phẩm phải thuộc ít nhất một nhà cung cấp';
    elsif not exists (select 1 from danh_muc_san_pham where ma_san_pham = NEW.ma_san_pham) then
        raise exception 'Một sản phẩm phải thuộc ít nhất một danh mục';
    end if;
    return new;
end;
$$ language plpgsql;

-- trigger on insert 'san_pham'
create trigger trg_chk_san_pham
after insert on san_pham
for each row execute function chk_san_pham();

-- ensure a san_pham belong to a nha_cung_cap when delete
create or replace function chk_nha_cung_cap_san_pham()
returns trigger as $$
begin
    if not exists (select 1 from nha_cung_cap_san_pham where ma_san_pham = OLD.ma_san_pham) then
        raise exception 'Một sản phẩm phải thuộc ít nhất một nhà cung cấp';
    end if;
    return new;
end;
$$ language plpgsql;

-- trigger on delete 'nha_cung_cap_san_pham'
create trigger trg_chk_nha_cung_cap_san_pham
after delete on nha_cung_cap_san_pham
for each row execute function chk_nha_cung_cap_san_pham();

-- ensure a san_pham belong to a danh_muc when delete
create or replace function chk_danh_muc_san_pham()
returns trigger as $$
begin
    if not exists (select 1 from danh_muc_san_pham where ma_san_pham = OLD.ma_san_pham) then
        raise exception 'Một sản phẩm phải thuộc ít nhất một danh mục';
    end if;
    return new;
end;
$$ language plpgsql;

-- trigger on delete 'danh_muc_san_pham'
create trigger trg_chk_danh_muc_san_pham
after delete on danh_muc_san_pham
for each row execute function chk_danh_muc_san_pham();

-- ensure a don_hang has at least one san_pham when create
create or replace function chk_don_hang()
returns trigger as $$
begin
    if not exists (select 1 from chi_tiet_don_hang_san_pham where ma_don_hang = NEW.ma_don_hang) then
        raise exception 'Một đơn hàng phải có ít nhất một sản phẩm';
    end if;
    return new;
end;
$$ language plpgsql;

-- trigger on create 'don_hang'
create trigger trg_chk_don_hang
after insert on don_hang
for each row execute function chk_don_hang();

-- ensure a don_hang has at least one san_pham when delete
create or replace function chk_chi_tiet_don_hang_san_pham()
returns trigger as $$
begin
    if not exists (select 1 from chi_tiet_don_hang_san_pham where ma_don_hang = OLD.ma_don_hang) then
    raise exception 'Một đơn hàng phải có ít nhất một sản phẩm';
    end if;
    return new;
end;
$$ language plpgsql;

-- trigger on delete 'chi_tiet_don_hang_san_pham'
create trigger trg_chk_chi_tiet_don_hang_san_pham
after delete on chi_tiet_don_hang_san_pham
for each row execute function chk_chi_tiet_don_hang_san_pham();

-- trang_thai_don_hang follows correct workflow
create or replace function chk_trang_thai_don_hang_workflow()
returns trigger as $$
begin
    -- if current is 'Đang xử lý' then only allow change to 'Đã giao hàng' or 'Đã hủy'
    if OLD.trang_thai_don_hang = 'Đang xử lý' and NEW.trang_thai_don_hang in ('Đã giao hàng', 'Đã hủy') then
        return NEW;
    -- else not allow to change trang_thai_don_hang to anything else
    elsif OLD.trang_thai_don_hang != NEW.trang_thai_don_hang then
        raise exception 'Cập nhật trạng thái đơn hàng từ % thành % là không hợp lệ', OLD.trang_thai_don_hang, NEW.trang_thai_don_hang;
    end if;
    return NEW;
end;
$$ language plpgsql;

-- trigger on update 'don_hang'
create trigger trg_chk_trang_thai_don_hang_workflow
before update on don_hang
for each row execute function chk_trang_thai_don_hang_workflow();
