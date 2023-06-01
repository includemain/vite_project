import React from 'react';

import { useBoolean, useRequest } from 'ahooks';

async function getArticle(params: any): Promise<{ data: string; time: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
        console.log('更细获得新数据');
      resolve(params);
    }, 1000);
  });
}


// const cacheMap = {}

// const getOriginData = (param, request, callback) => {
//     const newData = await request(param)
//     cashData[paramKey] = res
//     callback()

// }

// const inline = (param, callback, request) => {
//   const cashData = {}
//   const paramKey = JSON.stringify(param)
// //   return async () => {
// //     let res
// //     if (cashData[paramKey]) {
// //        res = 'cash' + cashData[paramKey]
// //     }
// //     getOriginData(param, request, callback)
// //     return res
// //   }
// }

// const cashRequest = async (param, callback, getArticle) => {

// }











const Article = () => {
  const { data, loading } = useRequest(() => getArticle({params: Math.random() * 10} ), {
    // cacheKey: 'cacheKey-demo',
  });
  if (!data && loading) {
    return <p>Loading</p>;
  }
  return (
      <h1>{JSON.stringify(data)}</h1>
  );
};

const Cash = () => {
  const [state, { toggle }] = useBoolean();
  return (
    <div>
      <button type="button" onClick={() => toggle()}>
        show/hidden
      </button>
      {state && <Article />}
    </div>
  );
};

export default Cash