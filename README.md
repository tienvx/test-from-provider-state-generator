# Test ProviderState Generator

This is a demo project for this [bug](https://github.com/pact-foundation/pact-js/issues/1088)

# Usage

Commands to run:

```shell
yarn install
yarn test # Test should pass, but failed (as expected, a bug)
```

# Explain

See [Slack discussion](https://pact-foundation.slack.com/archives/C9VBGLUM9/p1683003726545669)

The idea is: `fromProviderState` use `'pact:matcher:type': 'type'`, so it only compare the **type** of 2 values when it's comparing 2 values.

If we use it in `path`, we will have the issue this project is trying to show.

```js
pact.addInteraction({
    withRequest: {
        method: 'GET',
        path: fromProviderState('${iri}', '/api/users/14f6626f-c51e-4311-ac52-182c8f2a7634')
    }
});
```

Here is the log:

```
DEBUG tokio-runtime-worker pact_matching::matchers: String -> String: comparing '/api/users/14f6626f-c51e-4311-ac52-182c8f2a7634' to '/any' ==> true cascaded=false matcher=Type
```
