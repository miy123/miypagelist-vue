/**
 * miypagelist-vue v1.0.0
 * by miy tsai
 */
var miypagelisthtml = `<div aria-label="Page navigation" class="dataTables_paginate paging_simple_numbers" v-if="RealPageLength>0">
<ul class="pagination d-flex justify-content-center">
    <li class="paginate_button page-item previous" v-once><a class="page-link" aria-label="上一頁" v-on:click="Prev()"
            href="javascript:void(0)"><span aria-hidden="true">上一頁</span></a>
    </li>
    <li class="paginate_button page-item" v-if="MinPage>11"><a class="page-link" href="javascript:void(0)"
            v-on:click="ChangePage(1)">1</a>
    </li>
    <li class="paginate_button page-item" v-if="MinPage>1"><a class="page-link" href="javascript:void(0)">..</a>
    </li>
    <li class="paginate_button page-item" v-for="(item,index) in MaxPage" :key="item" :class="{active:item==NowPage&&item >=MinPage}">
        <a class="page-link" href="javascript:void(0)" v-if="item==NowPage&&item >=MinPage">{{item}}</a>
        <a class="page-link" href="javascript:void(0)" v-if="item!=NowPage&&item >=MinPage" v-on:click="ChangePage(index+1)">{{item}}</a>
    </li>
    <li class="paginate_button page-item" v-if="MaxPage<RealPageLength"><a class="page-link" href="javascript:void(0)">..</a>
    </li>
    <li class="paginate_button page-item" v-if="MaxPage<RealPageLength-10"><a class="page-link" v-on:click="ChangePage(RealPageLength)"
            href="javascript:void(0)">{{RealPageLength}}</a>
    </li>
    <li class="paginate_button page-item next" v-once><a class="page-link" href="javascript:void(0)" v-on:click="Next()"
            aria-label="下一頁"><span aria-hidden="true">下一頁</span></a>
    </li>
</ul>
<div v-if="PageSize"><br />單頁顯示<input type="number" min="1" style="width:35px" v-model.lazy="MaxItemsOnePage"
        v-on:change="ChangeMaxItemsOnePage()" />筆
</div>`;

var MiyPagelist = function () {
    var option = {
        maxItemOnePage: 5,
        IsPageSize: false,
        templete: miypagelisthtml,
        searchModal: 'each'
    };
    var _miyPagelist;

    var _init = function (set) {
        option.maxItemOnePage = set ? (set.maxItemOnePage ? set.maxItemOnePage : option.maxItemOnePage) : option.maxItemOnePage;
        option.IsPageSize = set ? (set.IsPageSize ? set.IsPageSize : option.IsPageSize) : option.IsPageSize;
        option.templete = set ? (set.templete ? set.templete : option.templete) : option.templete;
        option.searchModal = set ? (set.searchModal ? set.searchModal : option.searchModal) : option.searchModal;

        return Vue.component('pagelist', {
            template: option.templete,
            data: function () {
                return {
                    HasBeenSearch: false,
                    PageData: [],
                    NowPage: 1,
                    MinPage: 1,
                    MaxItemsOnePage: option.maxItemOnePage,
                    MaxPageButton: 10,
                    PageSize: option.IsPageSize
                }
            },
            props: {
                dataslength: Number
            },
            computed: {
                MaxPage: function () {
                    if (this.MinPage + 10 - 1 > this.RealPageLength) {
                        return this.RealPageLength;
                    } else {
                        return this.MinPage + 10 - 1;
                    }
                },
                RealPageLength: function () {
                    return Math.floor(((this.dataslength - 1) / this.MaxItemsOnePage) + 1);
                }
            },
            watch: {
                MaxItemsOnePage: {
                    handler: function (newValue) {
                        if (this.NowPage > this.MaxPage) {
                            this.ChangePage(this.MaxPage);
                        }
                    },
                    deep: true
                }
            },
            methods: {
                Prev: function (page) {
                    page = (typeof page !== 'undefined') ? page : 1;

                    if (this.NowPage > 1) {
                        this.NowPage = this.NowPage - 1;
                        if (this.MinPage > 1) {
                            this.MinPage = this.MinPage - 1;
                        }
                        this.$emit('pagecnt', this.NowPage);
                        this.Search();
                    }
                },
                Next: function () {
                    if (this.NowPage < this.RealPageLength) {
                        this.NowPage = this.NowPage + 1;
                        if (this.MaxPage < this.RealPageLength) {
                            this.MinPage = this.MinPage + 1;
                        }
                        this.$emit('pagecnt', this.NowPage);
                        this.Search();
                    }
                },
                ChangePage: function (index) {
                    this.NowPage = index;
                    let maxNum = 5;
                    let minNum = 3;
                    let n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
                    let NewMinPage = index - n;
                    if ((NewMinPage <= 0)) {
                        NewMinPage = 1;
                    }
                    this.MinPage = NewMinPage;
                    this.$emit('pagecnt', this.NowPage);
                    this.Search();
                },
                Search: function () {
                    switch (option.searchModal) {
                        case 'all':
                            if (this.HasBeenSearch == false) {
                                this.HasBeenSearch = true;
                                this.$emit('search');
                            }
                            break;
                        case 'each':
                            this.HasBeenSearch = true;
                            this.$emit('search');
                            break;
                        default:
                    }
                },
                ChangeMaxItemsOnePage: function () {
                    if (this.MaxItemsOnePage <= 0) {
                        this.MaxItemsOnePage = 1;
                    }
                    this.ChangePage(1);
                    this.$emit('changemaxitemsonepage', this.MaxItemsOnePage);
                }
            }
        });
    };

    return {
        Init: function (option) {
            _miyPagelist = _init(option);
        }
    };
}();

// export default MiyPagelist; 


