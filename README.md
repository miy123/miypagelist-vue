# miypagelist-vue


simple pagination plugin for vue

## Getting Started

Just dowlond and include js files on html like other js plugin.

Or try the sample on <a href="https://jsfiddle.net/miy123/n0qo3v8x/13/">Jsfiddle</a>.

### Prerequisites

You should include bootstrap and Vue first.

### Installing

Set Style you want

```css
table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 50%;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
```

And html tag

```html
 <div id="page-layouts" class="col-lg-11">
        <h2>miypagelist Table</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>index</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in displayData">
                    <td>{{item.index}}</td>
                    <td>{{item.name}}</td>
                </tr>
            </tbody>
        </table>
        <pagelist v-bind:dataslength="viewData.length" v-on:pagecnt="searchParameter.pageCnt = $event" v-on:search="getViewData"
            v-on:changemaxitemsonepage="searchParameter.maxItemsOnePage = $event" ref="miy_pagelist"></pagelist>
    </div>
```

We should to let length of your data for show to bind components parm dataslength.
When event has been trigger,we should assign method or value to get change of child components. 

Js Code

```javascript
 MiyPagelist.Init({
            maxItemOnePage: 10,
            IsPageSize: true
        });

        var app = new Vue({
            el: '#page-layouts',
            data: {
                viewData: [],
                searchParameter: {
                    pageCnt: 1,
                    maxItemsOnePage: 10
                }
            },
            created: function () {
                this.getViewData();
            },
            computed: {
                displayData: function () {
                    return this.viewData.slice((this.searchParameter.pageCnt - 1) * this.searchParameter.maxItemsOnePage, this.searchParameter.pageCnt * this.searchParameter.maxItemsOnePage);
                }
            },
            methods: {
                getViewData: function () {
                    this.viewData = [];
                    for (i = 1; i <= 30; i++) {
                        this.viewData.push({ name: 'user' + i, index: i });
                    }
                }
            }
        });
```

## Authors

* Miy Clark
