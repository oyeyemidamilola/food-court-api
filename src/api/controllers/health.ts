
import { Service } from 'typedi';

import {
	Authorized,
	Get,
	JsonController,
	UseBefore,
} from 'routing-controllers';

@JsonController()
@Service()
// @OpenAPI({ security: [{ bearerAuth: [], ApiKeyAuth: [] }] })
export class HealthController {
	@Get('')
	// @UseBefore(AuthenticateClientMiddleware)
	// @Authorized(['payment:read'])
	async status() {
		return { status: 'OK' };
	}
}
