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
export const res = cacheRequest()
