export function sign() {
    
    const private_key = '-----BEGIN PRIVATE KEY-----\n' +
        'XXXXXXXXXXANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdTR5gmwGH77wE\n' +
        'XXXXXXXXXXVhiw7fPXWhMh7gZwurQQ8M/I9/VA8lDjwwoGuuJ6enurdfwhpZxeZH\n' +
        'XXXXXXXXXXLESEXVuxJv5hdpI9m6ydInK9SA8IbaF4yYWp0l4N2mA44MzadA7QZq\n' +
        'XXXXXXXXXXeia5q/NZHFWCrCbW2lGAAWwrhQq9LceVIW75e213xtnps0pGlII7Ye\n' +
        'XXXXXXXXXXX8YNSxlCdLOiz1GvOeVSeiSZx31o/O+rj7tDFpSgZJEXRmtGRoJkJy\n' +
        'XXXXXXXXXXzCVSOcb1hCExg4osK6rBKnDjFjwQvwvNNZq0JG+CkfH8eHAa7gSK50\n' +
        'XXXXXXXXXXMBAAECggEAEvYk30hQGu7PH0stQX3UhlVsR6HXnRlvgIrmJe7F/VLO\n' +
        'XXXXXXXXXXtU/heYY1nsX8+mIyjmvEOayqPgdkEmXevVlcuQf38Zbduynr3vlRCX\n' +
        'XXXXXXXXXXucSxFBODuu/EAZc3mm27C2wUV7w6SAy9g0g6Os97ehZsSGAwHl4aye\n' +
        'XXXXXXXXXX10Eh5Ptq4YAfCYiUO7j10pQ+DJKqN9N1eyjyw5eixEgCpudcbpCc9X\n' +
        'XXXXXXXXXXr0ANX8/LwvokqgYBK1UIL6ear0dtKmeFU+KwrmkKZfXk8/Amr/O8Ot\n' +
        'XXXXXXXXXXKRzq3La149LMmNkUYxaMSV/KGTEV7ukQKBgQDQl/fA3mxXtQg2IjTB\n' +
        'XXXXXXXXXXhaECWcP7TQWJDb30vxOKeq1k9YPUfegZga5zlyV28PAZnb0m5x07+0\n' +
        'XXXXXXXXXXpje9OhQxfkAY6AtJaiIqhCcw5ew8Go/Ja1ML0jZESWG1MWBJtCcFTm\n' +
        'XXXXXXXXXX1Ze0adilYmyu7zwwKBgQDBDPJZgSj7YssPyRmo3bO0MjknfYBqXvwi\n' +
        'XXXXXXXXXX5BJ9Rc2WXGfEm3DEn7TO/Wv0t7Yqm6/sXg5HzriN/PHlaVtE6wlXe7\n' +
        'XXXXXXXXXXKO7KKWYqP812mASl6ydLX9QWozlOXjVhWMuSGqMWjut4J3P8jlkOJ6\n' +
        'XXXXXXXXXXKBgQCxwvAl8ubNj78hsuDWgsddKIMkwvKrfdsvXrMOYouAdLjZJvjs\n' +
        'XXXXXXXXXXl3s9km8g/479pYlOn+Iv/Z7Lqke8/HdOFASoQ9h1nSuujgEgXUwkg1\n' +
        'XXXXXXXXXX0k2BY3FPnGGh8iQma1pdkUVn35fAq/m7e/S+kP1JY6lPIx1QKBgQCS\n' +
        'XXXXXXXXXXNmpot+ceGt2bseSd8l4jqU3nDZ0oW8+4Qnnu9QFhN4Hn9wIjpAOGaU\n' +
        'XXXXXXXXXXh+Vbior98JxMSDHsHmuXKPA8DishumGlqV+vxsIzLQD1Ge/dbqsERB\n' +
        'XXXXXXXXXXyfiyUNqjk5kcPQeHIyJk5qQaF21udoTQKBgDOMbtM0Nq7cd/SAHISR\n' +
        'XXXXXXXXXXAjLJW7DRJGxw3AEwxKG+nxNLeG7GsQDyPCvZSKwRpdpXRTh+6mzXqe\n' +
        'XXXXXXXXXXtez8Cwo6tgyKRi6QPObQk00vbrKEBTihP30m81rwBPzjwj7iKXxWgA\n' +
        'XXXXXXXXXXIf4qXXXXXXXXXX\n' +
        '-----END PRIVATE KEY-----\n'
    
    const ts = Date.now();
    const NodeRSA = require('node-rsa')
    const pri_key = new NodeRSA(private_key)

    //GET
    const ts = Date.now();
    const params = 'clientOid=123&coin=USDT&endTime=1659076670000&pageNo=1&pageSize=20&startTime=1659036670000' // Need to be sorted in ascending alphabetical order by key
    const endpoint = '/api/v2/spot/wallet/withdrawal-records'
    const method = "GET"
    const pre_hash = String(ts) + method + endpoint + '?' + params
    const sign = pri_key.sign(pre_hash, 'base64', 'UTF-8')

    //POST
    const endpoint_post = '/api/v2/spot/trade/unfilled-orders'
    const params_post = '{"symbol": "BTCUSDT"}'
    const method_post = "POST"
    const pre_hash_post = String(ts) + method_post + endpoint_post + params_post
    const sign_post = pri_key.sign(pre_hash_post, 'base64', 'UTF-8')
    
    return sign
}