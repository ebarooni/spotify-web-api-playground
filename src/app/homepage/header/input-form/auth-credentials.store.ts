import {Injectable} from "@angular/core";
import {createStore, setProps, Store, withProps} from "@ngneat/elf";

export interface AuthCredentialsProps {
  clientId: string | null,
  clientSecret: string | null,
  scope: string[]
}

@Injectable()
export class AuthCredentialsStore {
  readonly KEY = 'spotifyApiCredentials';
  readonly AUTH_CREDENTIALS_STORE = 'authCredentialsRepository';
  authCredentialsStore = this.initStore();

  private initStore(): Store<{name: string, state: AuthCredentialsProps, config: undefined}, AuthCredentialsProps> {
    const pastState = localStorage.getItem(this.KEY);
    if (pastState) {
      const parsedPastState = JSON.parse(pastState);
      return createStore(
        {name: this.AUTH_CREDENTIALS_STORE},
        withProps<AuthCredentialsProps>({
          clientId: parsedPastState.clientId,
          clientSecret: parsedPastState.clientSecret,
          scope: parsedPastState.scope ? parsedPastState.scope : []
        })
      );
    } else {
      return createStore(
        {name: this.AUTH_CREDENTIALS_STORE},
        withProps<AuthCredentialsProps>({
          clientId: null,
          clientSecret: null,
          scope: []
        })
      );
    }
  }

  updateAuthCredentialsStore(id: string | null, secret: string | null, scope: string[]): void {
    this.authCredentialsStore.update(
      setProps({
        clientId: id,
        clientSecret: secret,
        scope: scope
      })
    );
    if (id === null && secret === null && scope.length === 0) {
      localStorage.removeItem(this.KEY);
    } else {
      localStorage.setItem(
        this.KEY,
        JSON.stringify(<AuthCredentialsProps>{clientId: id, clientSecret: secret, scope: scope})
      );
    }
  }
}
