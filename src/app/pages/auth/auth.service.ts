import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { Router } from '@angular/router';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  password_confirmation: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public token$: Observable<string | null> = this.tokenSubject.asObservable();

  private tokenTypeSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  public tokenType$: Observable<string | null> =
    this.tokenTypeSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) {
    const token = localStorage.getItem('access_token');
    this.tokenSubject.next(token);
    const tokenType = localStorage.getItem('token_type');
    this.tokenTypeSubject.next(tokenType);
  }

  setToken(token: string): void {
    this.tokenSubject.next(token);
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  setTokenType(token_type: string) {
    this.tokenTypeSubject.next(token_type);
    localStorage.setItem('token_type', token_type);
  }

  getTokenType(): string | null {
    return this.tokenTypeSubject.value;
  }

  clearToken() {
    this.tokenTypeSubject.next(null);
    this.tokenSubject.next(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
  }

  register(registerData: RegisterData) {
    return this.http
      .post('/register', registerData)
      .pipe(
        catchError((e) => this.errorHandlerService.handleError(e, 'register')),
      );
  }

  login(loginData: LoginData) {
    return this.http
      .post<LoginResponse>('/login', loginData)
      .pipe(
        catchError((e) => this.errorHandlerService.handleError(e, 'login')),
      );
  }

  saveLoginInfo(data: LoginResponse) {
    this.setToken(data.access_token);
    this.setTokenType(data.token_type);
  }

  async logout() {
    this.clearToken();
    await this.router.navigate(['/auth/login']);
  }
}
