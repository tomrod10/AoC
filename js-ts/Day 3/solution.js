import * as fs from "fs";

const findPrioritySum = (path) => {
  const rucksacks = fs.readFileSync(path, { encoding: "UTF-8" }).split("\n");
  let prioritySum = 0;

  for (let i = 0; i < rucksacks.length; i++) {
    const items = rucksacks[i];

    const firstHalf = items.slice(0, items.length / 2);
    const secondHalf = items.slice(items.length / 2);

    const itemSet1 = new Set(firstHalf);
    const itemSet2 = new Set(secondHalf);
    itemSet2.forEach((item) => {
      if (itemSet1.has(item)) {
        prioritySum += getItemPriority(item);
        return;
      }
    });
  }
  return prioritySum;
};

const getItemPriority = (item) => {
  if (item === item.toUpperCase()) {
    return item.charCodeAt(0) - 65 + 27;
  } else {
    return item.charCodeAt(0) - 97 + 1;
  }
};

const findGroupPrioritySym = (path) => {
  const rucksacks = fs.readFileSync(path, { encoding: "UTF-8" }).split("\n");
  let groupPrioritySum = 0;

  for (let i = 0; i < rucksacks.length - 1; i += 3) {
    const r1 = rucksacks[i],
      r2 = rucksacks[i + 1],
      r3 = rucksacks[i + 2];
    groupPrioritySum += getGroupPrioritySum(r1, r2, r3);
  }

  return groupPrioritySum;
};

const getGroupPrioritySum = (group1, group2, group3) => {
  const set1 = new Set(group1),
    set2 = new Set(group2),
    set3 = new Set(group3);
  
    for (let item of set1) {
        if (set2.has(item) && set3.has(item)) {
            return getItemPriority(item)
        }
    }
};

console.log(findPrioritySum("./input.txt"));
console.log(findGroupPrioritySym("./input.txt"));
