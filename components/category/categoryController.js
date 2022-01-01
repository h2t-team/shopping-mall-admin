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
                        <a href="#" class="btn btn-sm btn-primary">EDIT</a>
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
                            <a href="#" class="btn btn-sm btn-primary">EDIT</a>
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
                            <a href="#" class="btn btn-sm btn-primary">EDIT</a>
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
                            <a href="#" class="btn btn-sm btn-primary">EDIT</a>
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

}