# Meting API

基于 [Meting](https://github.com/metowolf/meting) 的 实现的 API，支持网易云、QQ等音乐平台

项目地址: [meting-api](https://github.com/Motues/meting-api)

## 参数说明

`/music?server=[server]&type=[type]&id=[id]`

### serer

- 可选参数：`netease`, `tencent`, `kugou`, `baidu`, `kuwo`
- 如果不设置，则默认为 `netease`

### id

- 必填参数，为歌曲对应的 ID

### type

- 可选参数包括：`details`，`cover`，`lyric`，`url`，`search`

#### details

获取歌曲详细信息，请求示例：`/music?server=netease&type=details&id=30431366`

返回结果：

```json
{
    "id": 30431366,
    "name": "奇妙能力歌",
    "artist": [ "陈粒" ],
    "album": "如也",
    "pic_id": "7721870161993398",
    "url_id": 30431366,
    "lyric_id": 30431366,
    "source": "netease"
}
```
#### url

获取歌曲 URL，请求示例：`/music?server=netease&type=url&id=30431366&br=320`

可以通过参数 `br` 来设置歌曲的音质，默认为 `320`

#### cover

获取歌曲封面，请求示例：`/music?server=netease&type=cover&id=30431366&size=300`

**注意**：id为歌曲的id，不是图片的id

返回结果：

```json
{
    "url": "https://p3.music.126.net/VuJFMbXzpAProbJPoXLv7g==/7721870161993398.jpg?param=300y300"
}
```

#### lyric

获取歌词，请求示例：`/music?server=netease&type=lyric&id=30431366`

返回结果：

```json
{
    "lyric": "歌词",
}
```

#### search

搜索歌曲，请求示例：`/music?server=netease&type=search&id=陈粒&limit=5`

可以通过参数 `limit` 来设置搜索结果数量，默认为 `5`

返回结果：

```json
[
    {
    "id": 30431366,
    "name": "奇妙能力歌",
    "artist": [ "陈粒" ],
    "album": "如也",
    "pic_id": "7721870161993398",
    "url_id": 30431366,
    "lyric_id": 30431366,
    "source": "netease"
    },
    { }, ...
]
```

Made with ❤️ by [Motues](https://www.motues.top)
