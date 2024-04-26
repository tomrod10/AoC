import * as fs from "fs"

const findPrioritySum = (path) => {
    const rucksacks = fs.readFileSync(path, { encoding: 'UTF-8' }).split('\n')
    let prioritySum = 0

    for (let i = 0; i < rucksacks.length; i++) {
        const items = rucksacks[i]

        const firstHalf = items.slice(0, items.length / 2)
        const secondHalf = items.slice(items.length / 2)

        const itemSet1 = new Set(firstHalf)
        const itemSet2 = new Set(secondHalf)
        itemSet2.forEach((item) => {
            if (itemSet1.has(item)) {
                prioritySum += getItemPriority(item)
                return // will I exit into the outer loop? - YES!!
            }
        })
    }
    return prioritySum
}

const getItemPriority = (item) => {
    if (item === item.toUpperCase()) {
         return item.charCodeAt(0) - 65 + 27

    } else {
        return item.charCodeAt(0) - 97 + 1
    }
}

console.log(findPrioritySum('./input.txt'))

