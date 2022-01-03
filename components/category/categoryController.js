const categoryService = require('./categoryService');

function buildCategory(level, parent, categories, parent_cats) {
    var html = "";
    if (parent_cats[parent]) {
        for (let i = 0; i < parent_cats[parent].length; i++) {
            if (!parent_cats[parent_cats[parent][i]]) {
                if (level == 1) {
                    html += `
                    <tr>
                        <td style="padding-left:` + level * 15 + `px !important;font-weight:bold;">` +
                        categories[parent_cats[parent][i]].name +
                        `</td>
                    <td class="text-center">` + categories[parent_cats[parent][i]].total_products + `</td>
                    <td class="text-center">
                        <a href="/categories/updatecategory/${categories[parent_cats[parent][i]].id}" class="btn btn-sm btn-primary">EDIT</a>
                    </td>
                    </tr>`;
                } else {
                    html += `
                    <tr>
                        <td style="padding-left:` + level * 15 + `px !important;">
                            <img src="/images/enter.png"
                            style="width:17px;margin-bottom: 10px;">` +
                        categories[parent_cats[parent][i]].name +
                        `</td>
                        <td class="text-center">` + categories[parent_cats[parent][i]].total_products + `</td>
                        <td class="text-center">
                            <a href="/categories/updatecategory/${categories[parent_cats[parent][i]].id}" class="btn btn-sm btn-primary">EDIT</a>
                        </td>
                    </tr>`;
                }
            }
            if (parent_cats[parent_cats[parent][i]]) {
                if (level == 1) {
                    html += `
                    <tr>
                        <td style="padding-left:` + level * 15 + `px !important; font-weight:bold;">` +
                        categories[parent_cats[parent][i]].name +
                        `</td>
                        <td class="text-center">` + categories[parent_cats[parent][i]].total_products + `</td>
                        <td class="text-center">
                            <a href="/categories/updatecategory/${categories[parent_cats[parent][i]].id}" class="btn btn-sm btn-primary">EDIT</a>
                        </td>
                    </tr>`;
                } else {
                    html += `
                    <tr>
                        <td style="padding-left:` + level * 15 + `px !important;">
                            <img src="/images/enter.png"
                            style="width:17px;margin-bottom: 10px;">` +
                        categories[parent_cats[parent][i]].name +
                        `</td>
                        <td class="text-center">` + categories[parent_cats[parent][i]].total_products + `</td>
                        <td class="text-center">
                            <a href="/categories/updatecategory/${categories[parent_cats[parent][i]].id}" class="btn btn-sm btn-primary">EDIT</a>
                        </td>
                    </tr>`;
                }
                level++;
                html += buildCategory(level, parent_cats[parent][i], categories, parent_cats);
                level--;
            }
        }
    }
    return html;
}
module.exports = {
    list: async(req, res) => {
        try {
            const categories = await categoryService.list();
            var cats = new Array();
            var parent_cats = new Array();
            //create cats array (index: id, value: its value)
            //create parent_cats array (index: parent_id, value: id of children)
            for (let i = 0; i < categories.length; i++) {
                if (!categories[i].parent_id) {
                    parent_cats[0] = new Array();
                } else {
                    parent_cats[categories[i].parent_id] = new Array();
                }
            }
            for (let i = 0; i < categories.length; i++) {
                cats[categories[i].id] = categories[i];
                if (!categories[i].parent_id) {
                    parent_cats[0].push(categories[i].id);
                } else {
                    parent_cats[categories[i].parent_id].push(categories[i].id);
                }
            }
            //recursive function to create tree view html
            const result = buildCategory(1, 0, cats, parent_cats);
            res.render('category/categories', { title: 'Categories', result });
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    },
    addCategoryPage: async(req, res) => {
        try {
            const category = await categoryService.listSortNameAsc();
            res.render('category/addCategory', { title: 'Add Category', category, scripts: ['category.js'] });
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    },
    addCategoryForm: async(req, res) => {
        try {
            const { name, description, parentId } = req.body;
            await categoryService.addCategory(name, description, parentId);
            res.status(200).send({ message: "OK" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
    updateCategoryPage: async(req, res) => {
        try {
            const id = req.params.categoryId;
            const category = await categoryService.findCategoryById(id);
            const parentCategory = await categoryService.findCategoryById(category.parent_id);
            const categoryList = await categoryService.listSortNameAsc();
            //find child id
            var childId = [];
            childId.push(category.id);
            for (let j = 0; j < childId.length; j++) {
                for (let i = 0; i < categoryList.length; i++) {
                    if (childId[j] == categoryList[i].parent_id) {
                        childId.push(categoryList[i].id);
                    }
                }
            }
            //remove child out of list
            for (let i = 0; i < childId.length; i++) {
                const index = categoryList.map(function(e) { return e.id; }).indexOf(childId[i]);
                if (index > -1) {
                    categoryList.splice(index, 1);
                }
            }
            //remove parent of category
            const index = categoryList.map(function(e) { return e.id; }).indexOf(category.parent_id);
            if (index > -1) {
                categoryList.splice(index, 1);
            }
            res.render('category/updateCategory', { title: 'Update Category', category, parentCategory, categoryList, scripts: ['category.js'] });
        } catch (err) {
            console.log(err.message);
        }
    },
    updateCategoryForm: async(req, res) => {
        try {
            const { id, name, description, parentId } = req.body;
            await categoryService.updateCategory(id, name, description, parentId);
            res.status(200).send({ message: "OK" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
}