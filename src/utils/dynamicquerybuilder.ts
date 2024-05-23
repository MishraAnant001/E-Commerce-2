export function dynamicSort(sort: string) {
    const sortObject: any = {
        createdAt: -1,
    }
    if (!sort) {
        return sortObject
    }
    sort = sort.trim()
    let sortlist = sort.split(',')
    // console.log(sortlist)
    sortlist.forEach((item) => {
        // console.log(item)
        const flag = item[0] == '-' ? -1 : 1
        // console.log(flag)
        if (flag == -1) {
            item = item.replace('-', '')
        }
        sortObject[item] = flag
    })
    return sortObject;
}

export function dynamicSearchandFilter(searchfields: any, searchTerm: any, maxPrice: any, minPrice: any, filterobjectArray: any) {
    const matchObject: any = {}
    if (filterobjectArray.length != 0) {
        matchObject['$and'] = filterobjectArray
    }
    if (searchTerm) {
        const searchQueryArray = searchfields.map((field: any) => {
            return {
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            }
        })
        console.log(searchQueryArray)
        matchObject['$or'] = searchQueryArray;
    }
    if (minPrice) {
        matchObject['price'] = {
            $gte: Number(minPrice)
        }
    }
    if (maxPrice) {
        matchObject['price'] = {
            ...matchObject['price'],
            $lte: Number(maxPrice),
        }
    }
    // console.log(matchObject)
    return matchObject
}

