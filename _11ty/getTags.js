export default (function (collection) {
    let tagSet = new Set();
    collection.getAllSorted().forEach(function (item) {
        if ("tags" in item.data) {
            let tags = item.data.tags;
            if (typeof tags === "string") {
                tags = [tags];
            }
            tags = tags.filter(item => !item.startsWith('_') && item !== '');
            for (const tag of tags) {
                tagSet.add(tag);
            }
        }
    });
    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
});
