import {Injectable} from "@angular/core";
import {createStore, emitOnce, setProps, Store, withProps} from "@ngneat/elf";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";

interface AuthCredentialsProps {
  clientId: string | null,
  clientSecret: string | null
}

@Injectable()
export class AuthCredentialsRepository {
  private readonly KEY = 'spotifyApiCredentials';

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

  batchUpdate(id: string, secret: string): void {
    emitOnce(() => {
      this.updateClientId(id);
      this.updateClientSecret(secret);
    });
    persistState(this.authCredentialsStore, {
      key: this.KEY,
      storage: localStorageStrategy,
    });
  }

  private updateClientId(id: string): void {
    this.authCredentialsStore.update(
      setProps({
        clientId: id
      })
    );
  }
  private updateClientSecret(secret: string): void {
    this.authCredentialsStore.update(
      setProps({
        clientSecret: secret
      })
    );
  }
}
