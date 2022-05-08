# 这是一个示例 Python 脚本。

# 按 Shift+F10 执行或将其替换为您的代码。
# 按 双击 Shift 在所有地方搜索类、文件、工具窗口、操作和设置。

import json
import os
import urllib.parse


def main(name):
    # 在下面的代码行中使用断点来调试脚本。
    print(f'Hi, {name}')  # 按 Ctrl+F8 切换断点。


# 按间距中的绿色按钮以运行脚本。
if __name__ == '__main__':

    index_f = open("./index.html", mode="w", encoding="utf-8")
    configs_f = open("./configs.json", mode="r", encoding="utf-8")
    template_friend_link_f = open("./template/friend_link.html", mode="r", encoding="utf-8")
    template_main_f = open("./template/main.html", mode="r", encoding="utf-8")
    template_type_f = open("./template/url_type.html", mode="r", encoding="utf-8")
    template_type_item_f = open("./template/type_item.html", mode="r", encoding="utf-8")

    config_dic = json.loads(configs_f.read())
    template_friend_link = template_friend_link_f.read()
    template_main = template_main_f.read()
    template_type = template_type_f.read()
    template_type_item = template_type_item_f.read()

    friend_links_str = ""
    for friend_link in config_dic['friend_links']:
        tmp_str = template_friend_link.replace("{{LINK_URL}}", friend_link['url']) \
            .replace("{{LINK_NAME}}", friend_link['name'])
        friend_links_str += tmp_str
        pass

    template_type_str = ""
    template_type_item_str = ""
    for i in config_dic['types']:

        tmp_item_str = ""
        for u in i['urls']:
            t = template_type_item.replace("{{ITEM_HREF}}", u['url_href']) \
                .replace("{{ITEM_NAME}}", u['url_title'])

            if u.get("img_src") and os.path.exists(u.get("img_src")):
                t = t.replace("{{ITEM_IMG_SRC}}", u.get("img_src"))
            else:
                t = t.replace("{{ITEM_IMG_SRC}}", "./img/default.png")

            if u.get("url_desc"):
                t = t.replace("{{ITEM_DESC}}", u['url_desc'])
            else:
                t = t.replace("{{ITEM_DESC}}", "这里是描述文本")

            tmp_item_str += t

        template_type_str += template_type.replace("{{TYPE_NAME}}", i['type_name']) \
            .replace("{{TYPE_ITEMS}}", tmp_item_str)

    main_html = template_main.replace("{{FRIENDS_LINKS}}", friend_links_str) \
        .replace("{{TYPE}}", template_type_str)

    index_f.write(main_html)
    index_f.flush()
    index_f.close()
    configs_f.close()
    template_friend_link_f.close()
    template_main_f.close()
    template_type_f.close()
    template_type_item_f.close()
