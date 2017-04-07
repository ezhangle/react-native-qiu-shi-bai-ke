
import config from '../Config'
import { urlByAppendingParams } from './CommonFunc'

const kFirstPage = 0
const kCurrentPageKey = 'pageIndex'
const kPageSizeKey = 'pageSize'
const kPageSize = 20
const kDefaultListNode = 'list'

class ListRequest {
    constructor(requestNode: String) {
        this.requestNode = requestNode
        this.isFirstLoad = true
        this.dataList = []
        this.isReload = true
        this.currentPage = kFirstPage
        this.noMoreData = false
    }

    requestFirstPage(params) {
        this.isReload = true
        this.startRequest(params, kFirstPage)
    }

    requestNextPage(params) {
        this.isReload = false
        this.startRequest(params, this.currentPage + 1)
    }

    startRequest(params, page) {
        let requestParams = { ...params }
        requestParams[kCurrentPageKey] = page
        requestParams[kPageSizeKey] = kPageSize

        // let url = `${config.host}${this.requestNode}?page=${page}&count=${kPageSize}`
        let url = urlByAppendingParams(config.host + this.requestNode, requestParams);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                if (this.isReload) {
                    this.dataList = json.items
                    this.currentPage = kFirstPage
                } else {
                    this.dataList.push(...json.items)
                    this.currentPage++
                }
                this.noMoreData = json.items.count < kPageSize

                if (this.onSuccess) {
                    this.onSuccess()
                }
                // this.refs.listView.endRefreshing(RefreshState.Idle)

                console.log('Success!! page:' + page);
            }).catch((error) => {
                if (this.onFailure) {
                    this.onFailure()
                }
                console.log('error  ' + error);
                // this.refs.listView.endRefreshing(RefreshState.Failure)
            });
    }
}

export default ListRequest;

// - (void)buildListDataWithResult:(id)result {
//     NSArray *arr = nil;
//     if ([result isKindOfClass:[NSArray class]]) {
//         arr = result;
//     }else if ([result isKindOfClass:[NSDictionary class]]) {
//         arr = [result objectForKey:_listNode];
//     }

//     if ([arr isKindOfClass:[NSArray class]]) {
//         [_requestList removeAllObjects];
//         if (_infoClass) {
//             for (NSDictionary *infoDic in arr) {
//                 id info = [_infoClass yy_modelWithDictionary:infoDic];
//                 NSAssert(info, @"[ListRequest]:yy_modelWithDictionary 解析失败");

//                 [_requestList addObject:info];
//             }
//         }else {
//             [_requestList addObjectsFromArray:arr];
//         }
//         [_list addObjectsFromArray:_requestList];
//     }

//     _isReceiveAllList = _requestList.count < _pageLength;
// }

//     [RequestManager requestWithAction:_requestAction type:GET parameters:requestInfo success:^(id responseObject) {
//         self.originData = responseObject;

//         [self pretreatData];
//         //fuck
//         id data = responseObject[@"Datas"] ? : responseObject[@"Data"];
//         [self buildListDataWithResult:data];

//         [self.delegate listRequestDidFinish:self];
//     } failure:^(NSString *errorDescription) {
//         [self.delegate listRequestDidFinish:self];
//         [Toast showText:errorDescription];
//     }];
// }
