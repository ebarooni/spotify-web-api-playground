import {Injectable} from "@angular/core";
import {createStore, setProps, Store, withProps} from "@ngneat/elf";
import * as moment from "moment";

export interface AccessTokenProps {
  access_token: string | null,
  expires_in: number | null,
  token_type: string | null,
}

@Injectable()
export class AccessTokenRepository {
  readonly KEY = 'accessTokenInfo';
  readonly CLIENT_CREDENTIALS_ACCESS_TOKEN_STORE = 'clientCredentialsAccessTokenStore';

  accessTokenStore = this.initStore();

  private initStore(): Store<{name: string, state: AccessTokenProps, config: undefined}, AccessTokenProps> {
    const pastState = localStorage.getItem(this.KEY);
    if (pastState) {
      const parsedPastState = JSON.parse(pastState);
      return createStore(
        {name: this.CLIENT_CREDENTIALS_ACCESS_TOKEN_STORE},
        withProps<AccessTokenProps>({
          access_token: parsedPastState.access_token,
          expires_in: parsedPastState.expires_in,
          token_type: parsedPastState.token_type
        })
      );
    } else {
      return createStore(
        {name: this.CLIENT_CREDENTIALS_ACCESS_TOKEN_STORE},
        withProps<AccessTokenProps>({
          access_token: null,
          expires_in: null,
          token_type: null
        })
      );
    }
  }

  batchUpdateAccessTokenRepositoryStore(httpResponse: AccessTokenProps): void {
    if (httpResponse.expires_in) {
      httpResponse.expires_in = moment.now() + (httpResponse.expires_in * 1000);
    }
    this.accessTokenStore.update(
      setProps({
        access_token: httpResponse.access_token ? httpResponse.access_token : null,
        expires_in: httpResponse.expires_in ? httpResponse.expires_in : null,
        token_type: httpResponse.token_type ? httpResponse.token_type : null
      })
    );
    localStorage.setItem(
      this.KEY,
      JSON.stringify(<AccessTokenProps>{
        access_token: httpResponse.access_token,
        expires_in: httpResponse.expires_in,
        token_type: httpResponse.token_type
      })
    );
  }
}
