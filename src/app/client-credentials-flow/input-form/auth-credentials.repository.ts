import {Injectable} from "@angular/core";
import {createStore, setProps, Store, withProps} from "@ngneat/elf";

interface AuthCredentialsProps {
  clientId: string | null,
  clientSecret: string | null
}

@Injectable()
export class AuthCredentialsRepository {
  readonly KEY = 'spotifyApiCredentials';

  authCredentialsStore = this.initStore();

  private initStore(): Store<{name: string, state: AuthCredentialsProps, config: undefined}, AuthCredentialsProps> {
    const pastState = localStorage.getItem(this.KEY);
    if (pastState) {
      const parsedPastState = JSON.parse(pastState);
      return createStore(
        {name: 'authCredentials'},
        withProps<AuthCredentialsProps>({
          clientId: parsedPastState.clientId,
          clientSecret: parsedPastState.clientSecret
        })
      );
    } else {
      return createStore(
        {name: 'authCredentials'},
        withProps<AuthCredentialsProps>({
          clientId: null,
          clientSecret: null
        })
      );
    }
  }

  batchUpdateClientIdAndClientSecret(id: string, secret: string): void {
    this.authCredentialsStore.update(
      setProps({
        clientId: id,
        clientSecret: secret
      })
    );
    localStorage.setItem(
      this.KEY,
      JSON.stringify(<AuthCredentialsProps>{clientId: id, clientSecret: secret})
    );
  }
}
