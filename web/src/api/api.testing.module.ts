import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {apis} from './apis';
import {MockApiTestingInterceptor} from "@yunzhi/ng-mock-api/testing";

/**
 * 用于单元测试的ApiModule.
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS, multi: true, useClass: MockApiTestingInterceptor.forRoot(apis)
    }]
})
export class ApiTestingModule {
}
