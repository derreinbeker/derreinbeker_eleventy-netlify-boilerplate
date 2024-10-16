export default (function (collection) {
    let categories = {};
    collection.getAllSorted().forEach(item => {
        let category = item.data.category;
        if (typeof category !== "string")
            return;
        if (Array.isArray(categories[category]))
            categories[category].push(item);
        else
            categories[category] = [item];
    });
    return categories;
});
