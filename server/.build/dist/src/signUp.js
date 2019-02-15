var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fromEvent = require('graphcool-lib').fromEvent;
var bcrypt = require('bcryptjs');
var validator = require('validator');
var SALT_ROUNDS = 10;
module.exports = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var graphcool, api, _a, email, password, privacyPolicyConsent, userExists, salt, hashedPassword, user, token, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                graphcool = fromEvent(event);
                api = graphcool.api('simple/v1');
                _a = event.data, email = _a.email, password = _a.password, privacyPolicyConsent = _a.privacyPolicyConsent;
                if (!privacyPolicyConsent) {
                    return [2 /*return*/, { error: 'Wymagana zgoda na przetwarzanie danych osobowych' }];
                }
                if (!validator.isEmail(email)) {
                    return [2 /*return*/, { error: 'Nieprawidłowy email' }];
                }
                if (!password.trim()) {
                    return [2 /*return*/, { error: 'Hasło jest wymagane' }];
                }
                return [4 /*yield*/, getUser(api, email).then(function (response) { return response.User !== null; })];
            case 1:
                userExists = _b.sent();
                if (userExists) {
                    return [2 /*return*/, { error: 'Użytkownik o podanym loginie już istnieje' }];
                }
                salt = bcrypt.genSaltSync(SALT_ROUNDS);
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, createGraphcoolUser(api, email, hashedPassword)];
            case 3:
                user = _b.sent();
                return [4 /*yield*/, graphcool.generateNodeToken(user.id, 'User')];
            case 4:
                token = _b.sent();
                return [2 /*return*/, {
                        data: {
                            authUser: {
                                id: user.id,
                                email: user.email,
                                role: user.role,
                                weddings: user.weddings,
                            },
                            token: token,
                        },
                    }];
            case 5:
                e_1 = _b.sent();
                console.log(e_1);
                return [2 /*return*/, { error: 'Wystąpił nieoczekiwany błąd' }];
            case 6: return [2 /*return*/];
        }
    });
}); };
function getUser(api, email) {
    return __awaiter(this, void 0, void 0, function () {
        var query, variables;
        return __generator(this, function (_a) {
            query = "\n    query getUser($email: String!) {\n      User(email: $email) {\n        id\n      }\n    }\n  ";
            variables = {
                email: email,
            };
            return [2 /*return*/, api.request(query, variables)];
        });
    });
}
function createGraphcoolUser(api, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var mutation, variables;
        return __generator(this, function (_a) {
            mutation = "\n    mutation createGraphcoolUser($email: String!, $password: String!, $privacyPolicyConsent: DateTime!) {\n      createUser(\n        email: $email,\n        password: $password\n        role: Organiser\n\t\tprivacyPolicyConsent: $privacyPolicyConsent\n      ) {\n        id\n        email\n        role\n        weddings {\n          id\n        }\t\n      }\n    }\n  ";
            variables = {
                email: email,
                password: password,
                privacyPolicyConsent: new Date().toISOString(),
            };
            return [2 /*return*/, api.request(mutation, variables).then(function (response) { return response.createUser; })];
        });
    });
}
