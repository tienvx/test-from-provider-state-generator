import { PactV3, MatchersV3, V3MockServer, SpecificationVersion } from '@pact-foundation/pact';
import { describe, it, expect } from 'vitest';

const { fromProviderState } = MatchersV3;

const pact = new PactV3({
    dir: `${__dirname}/../pacts`,
    consumer: 'MyConsumer',
    provider: 'MyProvider',
    spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
});

describe('GET /api/users/14f6626f-c51e-4311-ac52-182c8f2a7634', () => {
    it('returns an HTTP 200', async () => {
        pact.addInteraction({
            states: [{ description: 'A user' }],
            uponReceiving: 'get one user',
            withRequest: {
                method: 'GET',
                path: fromProviderState('${iri}', '/api/users/14f6626f-c51e-4311-ac52-182c8f2a7634')
            },
            willRespondWith: {
                status: 200,
                body: {
                    id: '14f6626f-c51e-4311-ac52-182c8f2a7634'
                },
            },
        });

        await pact.executeTest(async (mockserver: V3MockServer) => {
            let response = await fetch(`${mockserver.url}/any`, {
                method: 'GET'
            })
            expect(response.status).to.deep.eq(404);
            expect(await response.json()).not.to.deep.eq({
                id: '14f6626f-c51e-4311-ac52-182c8f2a7634'
            });
        });
    });
});
