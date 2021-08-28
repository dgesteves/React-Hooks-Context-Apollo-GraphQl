const check_auth = require("./check-auth")
// @ponicode
describe("check_auth", () => {
    test("0", () => {
        let callFunction = () => {
            check_auth({ req: { headers: { authorization: "oAuthTokenBearer " } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            check_auth({ req: { headers: { authorization: "Bearer u7djsl186ksk99-DsklLk89" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            check_auth({ req: { headers: { authorization: "oAuthTokenBearer oAuthToken" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            check_auth({ req: { headers: { authorization: "Bearer " } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            check_auth({ req: { headers: { authorization: "u7djsl186ksk99-DsklLk89" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            check_auth(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
