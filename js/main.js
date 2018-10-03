import miyPageList from '@js/miypagelist-vue-1.0.js';

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
        miyPageList.Init();
        this.getViewData();
    },
    methods: {
        getViewData: function () {
            for (i = 1; i <= 30; i++) {
                this.viewData.push({ name: 'user' + i, index: i });
            }
        }
    }
});