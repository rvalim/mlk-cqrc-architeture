local cjson = require "cjson.safe"

local M = {}

local function sendError()
    ngx.status = ngx.HTTP_FORBIDDEN
    ngx.say(cjson.encode({ message = "ERR_FORBIDDEN" }))  
    return ngx.exit(ngx.HTTP_FORBIDDEN)  
end

function M.validate()
    local authorization = ngx.var.http_authorization
    local http = require "resty.http"
    local httpc = http.new()
    local res, err = httpc:request_uri(os.getenv("AUTH_VALIDATE_URL"), {
        method = "GET",
        query = {
            ["route"] = ngx.var.uri,
            ["method"] = ngx.var.request_method
        },
        headers = {
            ["Content-Type"] = "application/x-www-form-urlencoded",
            ["Authorization"] = authorization,
            ["Host"] = ngx.var.host,
            ["X-Real-IP"] = ngx.var.remote_addr,
            ["X-Forwarded-For"] = ngx.var.proxy_add_x_forwarded_for,
            ["X-Forwarded-Host"] = ngx.var.server_name
        },
        keepalive_timeout = 60,
        keepalive_pool = 10
    })
 
    if not res then
        sendError();
        return false
    end

    if res.status >= 400 then
        sendError();
        return false
    end

    return true
end

return M