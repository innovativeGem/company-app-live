webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-container\">\n  <table cellspacing=\"0\" cellpadding=\"10em\" id=\"employee-table\">\n      <tr>\n        <th colspan=\"3\">\n            <h1>Company Employee Hierarchy</h1>\n        </th>\n      </tr>\n  </table>\n  <table cellspacing=\"0\" cellpadding=\"10em\" id=\"invalid-employee-table\">\n      <tr>\n        <th colspan=\"3\">\n            <h1>Company Invalid Employee Hierarchy</h1>\n        </th>\n      </tr>\n  </table>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ".app-container #employee-table, .app-container #invalid-employee-table {\n  margin: 0 auto; }\n\n.app-container #invalid-employee-table {\n  display: none; }\n\n.app-container h1 {\n  font-size: 1.5em;\n  margin: 2% 0;\n  text-align: center; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_company_service__ = __webpack_require__("./src/app/service/company.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(companyService) {
        this.companyService = companyService;
        this.ceo = '150'; // CEOs id
        this.compHierarchy = []; // Array sorted as per company hierarchy
        this.invalidEmployees = []; // Array for invalid employees
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyService.getData().subscribe(function (data) {
            var empArr = []; // temporary employees array.
            // Create new employee from the data object.
            data.map(function (curr, i, arr) {
                var employee = new Employee(curr.name, curr.id, curr.managerId);
                var pos = employee.getPosition(curr, _this.ceo);
                var mId = curr.managerId;
                if (pos === 4) {
                    _this.invalidEmployees.push({ employee: employee, pos: pos });
                }
                else {
                    empArr.push({ employee: employee, pos: pos });
                }
            });
            // Sort temperory employees array as per their position.
            empArr.sort(function (a, b) {
                var posA = a.pos, posB = b.pos;
                return posA - posB;
            });
            // console.log(empArr);
            // Sort employees array in the order of their hierarchy.
            _this.hierarchy(empArr);
            _this.hierarchyInvalidE(_this.invalidEmployees);
        });
    };
    AppComponent.prototype.hierarchy = function (arr) {
        var _this = this;
        var pEl = 'employee-table';
        var _loop_1 = function (i) {
            if (arr[i].pos === 0) {
                this_1.compHierarchy.push(arr[i]);
                // break;
            }
            else if ((arr[i].employee.managerId !== '') && (arr[i].employee.managerId !== arr[i - 1].employee.managerId)) {
                var checkEl = this_1.compHierarchy.includes(arr[i]);
                console.log(checkEl);
                if (!checkEl) {
                    var mId_1 = arr[i].employee.managerId; // Manager ID
                    var nPos_1 = this_1.compHierarchy.findIndex(function (e) { return e.employee.id === mId_1; }); // Position of the manager object
                    var eArr = arr.filter(function (e) { return e.employee.managerId === mId_1; });
                    // this.compHierarchy = this.compHierarchy.concat(eArr);
                    console.log('nPos: ', nPos_1);
                    eArr.forEach(function (el, j) {
                        _this.compHierarchy.splice((nPos_1 + (j + 1)), 0, el);
                    });
                    // console.log(arr[i].employee.managerId, '   ', eArr);
                }
            }
            else if (arr[i].pos === 3) {
                // console.log('Unsupervised: ', arr[i]);
                this_1.compHierarchy.splice(this_1.compHierarchy.length, 0, arr[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < arr.length; i++) {
            _loop_1(i);
        }
        console.log('compHierarchy: ', this.compHierarchy);
        this.addEmployees(this.compHierarchy, pEl);
    };
    AppComponent.prototype.hierarchyInvalidE = function (arr) {
        if (arr.length > 0) {
            var pEl = 'invalid-employee-table';
            document.getElementById('invalid-employee-table').style.display = 'table';
            // this.invalidEmployees.push(arr[i]);
            console.log('Invalid employee: ', this.invalidEmployees);
            this.addEmployees(this.invalidEmployees, pEl);
        }
    };
    AppComponent.prototype.addEmployees = function (arr, parentE) {
        var _this = this;
        arr.forEach(function (el) {
            _this.addUIElement(el, parentE);
        });
    };
    AppComponent.prototype.hierarchyStr = function (e, p) {
        var str;
        var templateString = "\n    <td>%col-1%</td>\n    <td>%col-2%</td>\n    <td>%col-3%</td>";
        if (p === 0) {
            str = templateString.replace('%col-1%', e.name).replace('%col-2%', '').replace('%col-3%', '');
        }
        else if (p === 1) {
            str = templateString.replace('%col-1%', '').replace('%col-2%', e.name).replace('%col-3%', '');
        }
        else if (p === 2) {
            str = templateString.replace('%col-1%', '').replace('%col-2%', '').replace('%col-3%', e.name);
        }
        else if (p === 3) {
            templateString = "<td colspan=\"3\" style=\"text-align:right;\">%col-1%</td>";
            str = templateString.replace('%col-1%', e.name);
        }
        else if (p === 4) {
            templateString = "<td colspan=\"3\" style=\"text-align:center;\">%col-1%</td>";
            str = templateString.replace('%col-1%', e.name);
        }
        return str;
    };
    AppComponent.prototype.addUIElement = function (e, parentE) {
        var employee = e.employee;
        var position = e.pos;
        var mId = employee.managerId;
        // console.log(`${employee.name} ${employee.id} ${mId} `);
        // const manager = document.querySelector('#id' + mId);
        var trNode = document.createElement('tr');
        trNode.setAttribute('id', "id" + employee.id);
        trNode.innerHTML = this.hierarchyStr(employee, position);
        document.getElementById(parentE).appendChild(trNode);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_company_service__["a" /* CompanyService */]) === "function" && _a || Object])
], AppComponent);

// Employee Class
var Employee = (function () {
    // ceoId = '150'; // Company id of the CEO
    function Employee(name, id, managerId) {
        this.hierarchyOrder = new Map();
        // initial values
        this.name = name;
        this.id = id || '';
        this.managerId = managerId || '';
        this.position = 'worker';
        // Set hierarchal positions
        this.hierarchyOrder.set('ceo', 0);
        this.hierarchyOrder.set('manager', 1);
        this.hierarchyOrder.set('worker', 2);
        this.hierarchyOrder.set('unsupervised worker', 3);
        this.hierarchyOrder.set('invalid manager', 4);
    }
    // Company hierarchy logic
    Employee.prototype.getPosition = function (e, cId) {
        var mId = e.managerId;
        var eId = e.id;
        if (e.id === cId) {
            return this.hierarchyOrder.get('ceo');
        }
        else if ((eId) && (mId === cId)) {
            return this.hierarchyOrder.get('manager');
        }
        else if ((mId) && (mId !== cId)) {
            return this.hierarchyOrder.get('worker');
        }
        else if ((mId === '') && (e.id !== cId)) {
            return this.hierarchyOrder.get('unsupervised worker');
        }
        else if ((eId === '') && (mId === cId)) {
            return this.hierarchyOrder.get('invalid manager');
        }
    };
    return Employee;
}());
var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_company_service__ = __webpack_require__("./src/app/service/company.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__service_company_service__["a" /* CompanyService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/service/company.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
    }
    CompanyService.prototype.getData = function () {
        return this.http.get("../company-app-live/assets/data.json")
            .map(function (res) { return res.json(); });
    };
    return CompanyService;
}());
CompanyService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], CompanyService);

var _a;
//# sourceMappingURL=company.service.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map