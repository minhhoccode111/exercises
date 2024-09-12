---------------------------------- POSTGRESQL ----------------------------------

-- NOTE:
-- nvarchar: for unicode characters


drop table if exists nha_cung_cap;
drop table if exists nha_cung_cap_san_pham;
drop table if exists san_pham;
drop table if exists danh_muc_san_pham;
drop table if exists danh_muc;
drop table if exists chi_tiet_don_hang_san_pham;
drop table if exists don_hang;
drop table if exists khach_hang;

-- table nha_cung_cap
create table nha_cung_cap (
    ma_nha_cung_cap         int not null,
    ten_nha_cung_cap        nvarchar(50) not null,
    so_dien_thoai           nvarchar(15) not null,
    dia_chi                 nvarchar(250),
    primary key(ma_nha_cung_cap)
);

-- table nha_cung_cap_san_pham
create table nha_cung_cap_san_pham (
    ma_nha_cung_cap         int not null,
    ma_san_pham             int not null,
    primary key(ma_nha_cung_cap, ma_san_pham),

    constraint fk_nha_cung_cap foreign key(ma_nha_cung_cap)
    -- delete nha_cung_cap is not allowed
    references nha_cung_cap(ma_nha_cung_cap) on delete restrict,

    constraint fk_san_pham foreign key(ma_san_pham)
    -- delete san_pham is allowed and nha_cung_cap_san_pham is automatically deleted
    references san_pham(ma_san_pham) on delete cascade
);

-- table san_pham NOTE: this is based
create table san_pham (
    ma_san_pham             int auto_increment,
    ten_san_pham            nvarchar(50) not null,
    mo_ta                   nvarchar(250),
    gia_ban                 decimal(9, 2) not null,
    so_luong_ton_kho        int default 0,
    hinh_anh                text,
    primary key(ma_san_pham),
    constraint chk_gia_ban_positive check (gia_ban > 0),
    constraint chk_so_luong_ton_kho_non_negative check (so_luong_ton_kho >= 0)
);

-- TODO: add trigger to make sure a nha_cung_cap_san_pham is created when a san_pham is inserted

-- table danh_muc_san_pham
create table danh_muc_san_pham (
    ma_san_pham             int not null,
    ma_danh_muc             int not null,
    primary key(ma_nha_cung_cap, ma_san_pham),
    constraint fk_nha_cung_cap foreign key(ma_nha_cung_cap)
    references nha_cung_cap(ma_nha_cung_cap),
    constraint fk_san_pham foreign key(ma_san_pham)
    references san_pham(ma_san_pham)
);
);

-- table danh_muc
create table danh_muc (
    ma_danh_muc             int not null,
    ten_danh_muc            nvarchar(50) not null,
    primary key(ma_danh_muc)
);

-- table don_hang
create table don_hang (
    ma_don_hang             int not null,
    ma_khach_hang           int not null,
    ngay_dat_hang           date not null,
    ngay_giao_hang          date,
    tong_tien               decimal(9, 2) check (tong_tien > 0) not null,
    trang_thai_don_hang     nvarchar(25),
    -- TODO: constraints: check in ('Đang xử lý', 'Đã giao hàng', 'Đã hủy'),
    phuong_thuc_thanh_toan  nvarchar(20),
    primary key(ma_don_hang)
    constraint fk_khach_hang foreign key(ma_khach_hang)
    references khach_hang(ma_khach_hang),
);

-- table chi_tiet_don_hang_san_pham
create table chi_tiet_don_hang_san_pham (
    ma_san_pham             int not null,
    ma_don_hang             int not null,
    don_gia                 decimal(9, 2) check (don_gia > 0) not null,
    so_luong                int check (so_luong >= 0) default 0,
    primary key(ma_san_pham, ma_don_hang),
    constraint fk_don_hang foreign key(ma_don_hang)
    references don_hang(ma_don_hang),
    constraint fk_san_pham foreign key(ma_san_pham)
    references san_pham(ma_san_pham)
);

-- table khach_hang
create table khach_hang (
    ma_khach_hang           int not null,
    ten_khach_hang          nvarchar(50),
    dia_chi                 nvarchar(250),
    so_dien_thoai           varchar(15),
    email                   varchar(50),
    mat_khau                varchar(128), -- hashed password max length
    primary key(ma_khach_hang)
);
