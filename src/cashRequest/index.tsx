import React from 'react';
import lodash from 'lodash'
import { useBoolean, useRequest } from 'ahooks';

async function getArticle(params: any): Promise<{ data: string; time: number }> {
  return new Promise((resolve) => {
     setTimeout(() => {
        console.log('恭喜获得新数据');
        resolve(params);
    }, 1000);
  });
}



const cacheRequest = () => {
    const cacheMap = new Map()

    return async  (request, params, callback, cashKey) => {
        if (cacheMap.has('xx')) {

            request(params).then(res => {
                cacheMap.set('xx', res)
                callback(cacheMap.get('xx'), res)
            })

            return Promise.resolve(cacheMap.get('xx'))
        }

        const resData = await request(params)
        cacheMap.set('xx', resData)
        return resData
    }
}

const res = cacheRequest()
const res2 = cacheRequest()


const Article = () => {
    const callback = (preData, newData) => {
        console.log('xxx-我不用cash，我偏要用新数据', newData);
    }
  const { data, loading } = useRequest(() => res(getArticle, {params: Math.random() * 10}, callback, 'xxx'), {
    // cacheKey: "cacheKey-demo"
  });

  const { data: data2, loading: loading2 } = useRequest(() => res(getArticle, {params2: Math.random() * 3}, callback, 'xxx'), {
    // cacheKey: "cacheKey-demo"
  });

// const { data, loading, runAsync } = useRequest(() => getArticle({params: Math.random() * 10}), {
//     manual: true
//     // cacheKey: "cacheKey-demo"
//   });

  React.useEffect(() => {
    //   console.log('xxx-我进来几次----');
    // runAsync()
  }, [])

  if ((!data && loading) || (!data2 && loading2)) {
    return <p>Loading</p>;
  }

  return (
      <div>
      <h1>{JSON.stringify(data)}</h1>
      <h3>{JSON.stringify(data2)}</h3>
      </div>
  );
};



const Cash = () => {
  const [state, setState] = React.useState(false);
  return (
    <div>
      <button type="button" onClick={() => setState(!state)}>
        show/hidden
      </button>
      {!!state && <Article />}
    </div>
  );
};

export default Cash