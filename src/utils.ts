import lodash from "lodash";
// export const createCacheRequest = () => {
//   const cacheMap = new Map();

//   return async (request, params, callback, cashKey) => {
//     if (cacheMap.has(cashKey)) {
//       // request(params).then(res => {
//       //     cacheMap.set(cashKey, res)
//       //     callback(cacheMap.get(cashKey), res)
//       // })

//       return Promise.resolve(cacheMap.get(cashKey));
//     }

//     const resData = await request(params);
//     cacheMap.set(cashKey, resData);
//     return resData;
//   };
// };

// class F {
//     cacheMap: Map<string, any>;

//     constructor() {
//         this.cacheMap = new Map();
//       }
// }
const cacheMap = new Map();

// 需要回掉时，必须写在组件中
// const { data, loading } = useRequest( () => cacheRequest( getArticle, {params: Math.random() * 10, id: 12}, callback, 'cacheKey' ), {
//     // cacheKey: "cacheKey-demo"
//   });

// 不用回掉时，可以写在servies中
// export const getSceneRootNode = async (sceneId: string) => {
//     return request('blackHole3D/project/scene/' + sceneId, {
//       method: 'GET',
//       notWrapperParam: false,
//       preHandle: false
//     })
//   }

class CreateCacheRequest<R, P, K>  {
    
  request: (Params: P) => Promise<R>
  params: P;
  callback: ((...args: any[]) => void) | undefined;
  cashKey: K | undefined;

  constructor(request: (Params: P) => Promise<R>, params:P, callback?: (...args: any[]) => void, cashKey?:K ) {
    this.request = request;
    this.params = params;
    this.callback = callback;
    this.cashKey = String(request) + String(params)
  }

  // 请求
  getCacheRequest() {

    const cacheData = cacheMap.has(this.cashKey);
    // 获取缓存的请求值
    if (cacheData) {
        
      // 如果传了callback，则发起一部分请求，执行回掉
      if (this.callback && lodash.isFunction(this.callback)) {
        this.initiateRequest();
      }

      return Promise.resolve( cacheMap.get(this.cashKey));
    }

    return this.asyncInitiateRequest();
  }

  // 向后端异步发起请求
  async asyncInitiateRequest() {
    const resData = await this.request(this.params);
    cacheMap.set(this.cashKey, resData);
    return resData;
  }

  // 向后端同步发起请求
  initiateRequest() {
    this.request(this.params).then((resData: R) => {
      cacheMap.set(this.cashKey, resData);
      this.callback?.(cacheMap.get(this.cashKey), resData);
    });
  }
}

export function cacheRequest <R, P, C, K> (request: (Params: P) => Promise<R>, params: P, callback?: (...args: C[]) => void, cashKey?: K) {
    const cacheRequestInstance = new CreateCacheRequest(request, params , callback, cashKey);
    return cacheRequestInstance.getCacheRequest()
}

async function getArticle(params: any): Promise<{ data: string; time: number }> {
    return new Promise((resolve) => {
       setTimeout(() => {
          console.log('恭喜获得新数据');
          resolve(params);
      }, 1000);
    });
  }

// const res = await  cacheRequest( getArticle, {params: Math.random() * 10, id: 12} )
// console.log('res', res)

const res =await  cacheRequest( getArticle, {params: Math.random() * 10, id: 12} )
console.log('res', res)
