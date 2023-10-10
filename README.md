This is a lightweight which bases on "fetch" request library.

#### Set Default Config

```typescript
import { defineDefaultConfig } from '@oasis-end/request'

defineDefaultConfig({
    method: 'post',
    baseUrl: import.env.VITE_URL
})
```

#### Modify Config Before Request

```typescript
import { onBeforeRequest } from '@oasis-end/request'

onBeforeRequest(config => {
    config.headers = new Headers(config.headers)
    config.headers.append('token', 'Bearer: test-token')
})
```

#### Use with unplugin-auto-import

```typescript
import { RequestAutoImport } from '@oasis-end/request'

AutoImport({
    imports: [ RequestAutoImport ]
})
```

#### Request Blob

```typescript
import { request } from '@oasis-end/request'
// res is "Blob"
const res = await request({}, 'blob')
```

#### Request ArrayBuffer

```typescript
import { request } from '@oasis-end/request'
// res is "ArrayBuffer"
const res = await request({}, 'arrayBuffer')
```