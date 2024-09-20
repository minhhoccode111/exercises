console.log('hello world');

// EASY

// simple solution with 2 nested loops
// Big O(n^2) - time complexity
var twoSum = function (nums, target) {
  for (let i = 0; i <= nums.length - 2; i++) {
    for (let j = i + 1; j <= nums.length - 1; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
};
// => we loop through each item, every item we loop again but current item to check if it sum up to target

// better solution with 2 separated loops
// Big O(n) - time complexity (or Big O(2n))
var twoSum = (nums, target) => {
  const hash = {};

  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] = i;
  }

  for (let j = 0; j < nums.length; j++) {
    /**
        hash = {
            '3':0,
            '2':1,
            '4':2,
        }
       */
    const diff = target - nums[j];
    if (hash[diff] && hash[diff] !== j) {
      return [hash[diff], j];
    }
  }
};
// => we store each item in array to a hash table with the item in array will be key in hash table and index of that item in the array will be the value of that key in hash table, and we loop through array again and check if the diff between target and current item in array actually exist in the hash table and it's not the same index as current item in the array, if it's existed then return
// BigO(n) time complexity (better than BigO(2n)
var twoSum=(n,t)=>{
    const table={};
    for(let i=0;i<n.length;i++){
        const completement=t-n[i]
        if(table[completement]!==undefined)return[table[completement],i]
        table[n[i]]=i
    }
}

// funny one line recursion but of out time
const twoSum=(n,t,map={},i=0)=>i===n.length?0:map[t-n[i]]!==undefined?[map[t-n[i]],i]:twoSum(n,t,{...map,[n[i]]:i},i+1); // out of time

