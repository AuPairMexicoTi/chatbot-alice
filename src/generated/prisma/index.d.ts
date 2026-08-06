/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Contact
 *
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>;
/**
 * Model Conversation
 *
 */
export type Conversation =
  $Result.DefaultSelection<Prisma.$ConversationPayload>;
/**
 * Model Message
 *
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>;
/**
 * Model WebhookEvent
 *
 */
export type WebhookEvent =
  $Result.DefaultSelection<Prisma.$WebhookEventPayload>;
/**
 * Model AiRun
 *
 */
export type AiRun = $Result.DefaultSelection<Prisma.$AiRunPayload>;
/**
 * Model ToolExecution
 *
 */
export type ToolExecution =
  $Result.DefaultSelection<Prisma.$ToolExecutionPayload>;
/**
 * Model Handoff
 *
 */
export type Handoff = $Result.DefaultSelection<Prisma.$HandoffPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const ConversationStatus: {
    OPEN: 'OPEN';
    WAITING_HUMAN: 'WAITING_HUMAN';
    CLOSED: 'CLOSED';
  };

  export type ConversationStatus =
    (typeof ConversationStatus)[keyof typeof ConversationStatus];

  export const MessageDirection: {
    INBOUND: 'INBOUND';
    OUTBOUND: 'OUTBOUND';
  };

  export type MessageDirection =
    (typeof MessageDirection)[keyof typeof MessageDirection];

  export const MessageType: {
    TEXT: 'TEXT';
    UNKNOWN: 'UNKNOWN';
    SYSTEM: 'SYSTEM';
  };

  export type MessageType = (typeof MessageType)[keyof typeof MessageType];

  export const MessageStatus: {
    RECEIVED: 'RECEIVED';
    QUEUED: 'QUEUED';
    SENT: 'SENT';
    FAILED: 'FAILED';
  };

  export type MessageStatus =
    (typeof MessageStatus)[keyof typeof MessageStatus];

  export const WebhookStatus: {
    RECEIVED: 'RECEIVED';
    QUEUED: 'QUEUED';
    PROCESSING: 'PROCESSING';
    PROCESSED: 'PROCESSED';
    FAILED: 'FAILED';
    IGNORED: 'IGNORED';
  };

  export type WebhookStatus =
    (typeof WebhookStatus)[keyof typeof WebhookStatus];

  export const HandoffStatus: {
    OPEN: 'OPEN';
    ACCEPTED: 'ACCEPTED';
    CLOSED: 'CLOSED';
  };

  export type HandoffStatus =
    (typeof HandoffStatus)[keyof typeof HandoffStatus];

  export const AiRunStatus: {
    STARTED: 'STARTED';
    COMPLETED: 'COMPLETED';
    FAILED: 'FAILED';
  };

  export type AiRunStatus = (typeof AiRunStatus)[keyof typeof AiRunStatus];

  export const ToolExecutionStatus: {
    STARTED: 'STARTED';
    COMPLETED: 'COMPLETED';
    FAILED: 'FAILED';
  };

  export type ToolExecutionStatus =
    (typeof ToolExecutionStatus)[keyof typeof ToolExecutionStatus];
}

export type ConversationStatus = $Enums.ConversationStatus;

export const ConversationStatus: typeof $Enums.ConversationStatus;

export type MessageDirection = $Enums.MessageDirection;

export const MessageDirection: typeof $Enums.MessageDirection;

export type MessageType = $Enums.MessageType;

export const MessageType: typeof $Enums.MessageType;

export type MessageStatus = $Enums.MessageStatus;

export const MessageStatus: typeof $Enums.MessageStatus;

export type WebhookStatus = $Enums.WebhookStatus;

export const WebhookStatus: typeof $Enums.WebhookStatus;

export type HandoffStatus = $Enums.HandoffStatus;

export const HandoffStatus: typeof $Enums.HandoffStatus;

export type AiRunStatus = $Enums.AiRunStatus;

export const AiRunStatus: typeof $Enums.AiRunStatus;

export type ToolExecutionStatus = $Enums.ToolExecutionStatus;

export const ToolExecutionStatus: typeof $Enums.ToolExecutionStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Contacts
 * const contacts = await prisma.contact.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Contacts
   * const contacts = await prisma.contact.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Contacts
   * const contacts = await prisma.contact.findMany()
   * ```
   */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Conversations
   * const conversations = await prisma.conversation.findMany()
   * ```
   */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Messages
   * const messages = await prisma.message.findMany()
   * ```
   */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEvent`: Exposes CRUD operations for the **WebhookEvent** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WebhookEvents
   * const webhookEvents = await prisma.webhookEvent.findMany()
   * ```
   */
  get webhookEvent(): Prisma.WebhookEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiRun`: Exposes CRUD operations for the **AiRun** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more AiRuns
   * const aiRuns = await prisma.aiRun.findMany()
   * ```
   */
  get aiRun(): Prisma.AiRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.toolExecution`: Exposes CRUD operations for the **ToolExecution** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ToolExecutions
   * const toolExecutions = await prisma.toolExecution.findMany()
   * ```
   */
  get toolExecution(): Prisma.ToolExecutionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.handoff`: Exposes CRUD operations for the **Handoff** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Handoffs
   * const handoffs = await prisma.handoff.findMany()
   * ```
   */
  get handoff(): Prisma.HandoffDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options]
      ? PrismaClientOptions
      : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? ((Without<T, U> & U) | (Without<U, T> & T)) & object
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
        | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Contact: 'Contact';
    Conversation: 'Conversation';
    Message: 'Message';
    WebhookEvent: 'WebhookEvent';
    AiRun: 'AiRun';
    ToolExecution: 'ToolExecution';
    Handoff: 'Handoff';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'contact'
        | 'conversation'
        | 'message'
        | 'webhookEvent'
        | 'aiRun'
        | 'toolExecution'
        | 'handoff';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>;
        fields: Prisma.ContactFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>;
          };
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>;
          };
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[];
          };
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>;
          };
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[];
          };
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>;
          };
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>;
          };
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[];
          };
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>;
          };
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateContact>;
          };
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ContactGroupByOutputType>[];
          };
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>;
            result: $Utils.Optional<ContactCountAggregateOutputType> | number;
          };
        };
      };
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>;
        fields: Prisma.ConversationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>;
          };
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>;
          };
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[];
          };
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>;
          };
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[];
          };
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>;
          };
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>;
          };
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[];
          };
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>;
          };
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateConversation>;
          };
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ConversationGroupByOutputType>[];
          };
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>;
            result:
              $Utils.Optional<ConversationCountAggregateOutputType> | number;
          };
        };
      };
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>;
        fields: Prisma.MessageFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMessage>;
          };
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MessageGroupByOutputType>[];
          };
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>;
            result: $Utils.Optional<MessageCountAggregateOutputType> | number;
          };
        };
      };
      WebhookEvent: {
        payload: Prisma.$WebhookEventPayload<ExtArgs>;
        fields: Prisma.WebhookEventFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.WebhookEventFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.WebhookEventFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>;
          };
          findFirst: {
            args: Prisma.WebhookEventFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.WebhookEventFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>;
          };
          findMany: {
            args: Prisma.WebhookEventFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[];
          };
          create: {
            args: Prisma.WebhookEventCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>;
          };
          createMany: {
            args: Prisma.WebhookEventCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.WebhookEventCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[];
          };
          delete: {
            args: Prisma.WebhookEventDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>;
          };
          update: {
            args: Prisma.WebhookEventUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>;
          };
          deleteMany: {
            args: Prisma.WebhookEventDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.WebhookEventUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.WebhookEventUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[];
          };
          upsert: {
            args: Prisma.WebhookEventUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>;
          };
          aggregate: {
            args: Prisma.WebhookEventAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWebhookEvent>;
          };
          groupBy: {
            args: Prisma.WebhookEventGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WebhookEventGroupByOutputType>[];
          };
          count: {
            args: Prisma.WebhookEventCountArgs<ExtArgs>;
            result:
              $Utils.Optional<WebhookEventCountAggregateOutputType> | number;
          };
        };
      };
      AiRun: {
        payload: Prisma.$AiRunPayload<ExtArgs>;
        fields: Prisma.AiRunFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AiRunFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AiRunFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>;
          };
          findFirst: {
            args: Prisma.AiRunFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AiRunFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>;
          };
          findMany: {
            args: Prisma.AiRunFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>[];
          };
          create: {
            args: Prisma.AiRunCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>;
          };
          createMany: {
            args: Prisma.AiRunCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AiRunCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>[];
          };
          delete: {
            args: Prisma.AiRunDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>;
          };
          update: {
            args: Prisma.AiRunUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>;
          };
          deleteMany: {
            args: Prisma.AiRunDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AiRunUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AiRunUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>[];
          };
          upsert: {
            args: Prisma.AiRunUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AiRunPayload>;
          };
          aggregate: {
            args: Prisma.AiRunAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAiRun>;
          };
          groupBy: {
            args: Prisma.AiRunGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AiRunGroupByOutputType>[];
          };
          count: {
            args: Prisma.AiRunCountArgs<ExtArgs>;
            result: $Utils.Optional<AiRunCountAggregateOutputType> | number;
          };
        };
      };
      ToolExecution: {
        payload: Prisma.$ToolExecutionPayload<ExtArgs>;
        fields: Prisma.ToolExecutionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ToolExecutionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ToolExecutionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>;
          };
          findFirst: {
            args: Prisma.ToolExecutionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ToolExecutionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>;
          };
          findMany: {
            args: Prisma.ToolExecutionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>[];
          };
          create: {
            args: Prisma.ToolExecutionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>;
          };
          createMany: {
            args: Prisma.ToolExecutionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ToolExecutionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>[];
          };
          delete: {
            args: Prisma.ToolExecutionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>;
          };
          update: {
            args: Prisma.ToolExecutionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>;
          };
          deleteMany: {
            args: Prisma.ToolExecutionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ToolExecutionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ToolExecutionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>[];
          };
          upsert: {
            args: Prisma.ToolExecutionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ToolExecutionPayload>;
          };
          aggregate: {
            args: Prisma.ToolExecutionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateToolExecution>;
          };
          groupBy: {
            args: Prisma.ToolExecutionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ToolExecutionGroupByOutputType>[];
          };
          count: {
            args: Prisma.ToolExecutionCountArgs<ExtArgs>;
            result:
              $Utils.Optional<ToolExecutionCountAggregateOutputType> | number;
          };
        };
      };
      Handoff: {
        payload: Prisma.$HandoffPayload<ExtArgs>;
        fields: Prisma.HandoffFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.HandoffFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.HandoffFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>;
          };
          findFirst: {
            args: Prisma.HandoffFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.HandoffFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>;
          };
          findMany: {
            args: Prisma.HandoffFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>[];
          };
          create: {
            args: Prisma.HandoffCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>;
          };
          createMany: {
            args: Prisma.HandoffCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.HandoffCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>[];
          };
          delete: {
            args: Prisma.HandoffDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>;
          };
          update: {
            args: Prisma.HandoffUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>;
          };
          deleteMany: {
            args: Prisma.HandoffDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.HandoffUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.HandoffUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>[];
          };
          upsert: {
            args: Prisma.HandoffUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HandoffPayload>;
          };
          aggregate: {
            args: Prisma.HandoffAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateHandoff>;
          };
          groupBy: {
            args: Prisma.HandoffGroupByArgs<ExtArgs>;
            result: $Utils.Optional<HandoffGroupByOutputType>[];
          };
          count: {
            args: Prisma.HandoffCountArgs<ExtArgs>;
            result: $Utils.Optional<HandoffCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     *
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     *
     * Learn more: https://pris.ly/d/driver-adapters
     *
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     *
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     *
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    contact?: ContactOmit;
    conversation?: ConversationOmit;
    message?: MessageOmit;
    webhookEvent?: WebhookEventOmit;
    aiRun?: AiRunOmit;
    toolExecution?: ToolExecutionOmit;
    handoff?: HandoffOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type ContactCountOutputType
   */

  export type ContactCountOutputType = {
    conversations: number;
  };

  export type ContactCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversations?: boolean | ContactCountOutputTypeCountConversationsArgs;
  };

  // Custom InputTypes
  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ContactCountOutputType
     */
    select?: ContactCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountConversationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ConversationWhereInput;
  };

  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number;
    aiRuns: number;
    handoffs: number;
  };

  export type ConversationCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs;
    aiRuns?: boolean | ConversationCountOutputTypeCountAiRunsArgs;
    handoffs?: boolean | ConversationCountOutputTypeCountHandoffsArgs;
  };

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
  };

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountAiRunsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AiRunWhereInput;
  };

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountHandoffsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HandoffWhereInput;
  };

  /**
   * Count Type AiRunCountOutputType
   */

  export type AiRunCountOutputType = {
    toolExecutions: number;
  };

  export type AiRunCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    toolExecutions?: boolean | AiRunCountOutputTypeCountToolExecutionsArgs;
  };

  // Custom InputTypes
  /**
   * AiRunCountOutputType without action
   */
  export type AiRunCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRunCountOutputType
     */
    select?: AiRunCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * AiRunCountOutputType without action
   */
  export type AiRunCountOutputTypeCountToolExecutionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ToolExecutionWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null;
    _min: ContactMinAggregateOutputType | null;
    _max: ContactMaxAggregateOutputType | null;
  };

  export type ContactMinAggregateOutputType = {
    id: string | null;
    externalId: string | null;
    name: string | null;
    phoneNumber: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ContactMaxAggregateOutputType = {
    id: string | null;
    externalId: string | null;
    name: string | null;
    phoneNumber: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ContactCountAggregateOutputType = {
    id: number;
    externalId: number;
    name: number;
    phoneNumber: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ContactMinAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    phoneNumber?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ContactMaxAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    phoneNumber?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ContactCountAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    phoneNumber?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ContactAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Contacts
     **/
    _count?: true | ContactCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ContactMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ContactMaxAggregateInputType;
  };

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
    [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>;
  };

  export type ContactGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ContactWhereInput;
    orderBy?:
      ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[];
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum;
    having?: ContactScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ContactCountAggregateInputType | true;
    _min?: ContactMinAggregateInputType;
    _max?: ContactMaxAggregateInputType;
  };

  export type ContactGroupByOutputType = {
    id: string;
    externalId: string;
    name: string | null;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ContactCountAggregateOutputType | null;
    _min: ContactMinAggregateOutputType | null;
    _max: ContactMaxAggregateOutputType | null;
  };

  type GetContactGroupByPayload<T extends ContactGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ContactGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ContactGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>;
        }
      >
    >;

  export type ContactSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      externalId?: boolean;
      name?: boolean;
      phoneNumber?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      conversations?: boolean | Contact$conversationsArgs<ExtArgs>;
      _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['contact']
  >;

  export type ContactSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      externalId?: boolean;
      name?: boolean;
      phoneNumber?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['contact']
  >;

  export type ContactSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      externalId?: boolean;
      name?: boolean;
      phoneNumber?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['contact']
  >;

  export type ContactSelectScalar = {
    id?: boolean;
    externalId?: boolean;
    name?: boolean;
    phoneNumber?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ContactOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'externalId' | 'name' | 'phoneNumber' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['contact']
  >;
  export type ContactInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversations?: boolean | Contact$conversationsArgs<ExtArgs>;
    _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ContactIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type ContactIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $ContactPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Contact';
    objects: {
      conversations: Prisma.$ConversationPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        externalId: string;
        name: string | null;
        phoneNumber: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['contact']
    >;
    composites: {};
  };

  type ContactGetPayload<
    S extends boolean | null | undefined | ContactDefaultArgs,
  > = $Result.GetResult<Prisma.$ContactPayload, S>;

  type ContactCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ContactCountAggregateInputType | true;
  };

  export interface ContactDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Contact'];
      meta: { name: 'Contact' };
    };
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(
      args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(
      args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     *
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ContactFindManyArgs>(
      args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     *
     */
    create<T extends ContactCreateArgs>(
      args: SelectSubset<T, ContactCreateArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ContactCreateManyArgs>(
      args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     *
     */
    delete<T extends ContactDeleteArgs>(
      args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ContactUpdateArgs>(
      args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ContactDeleteManyArgs>(
      args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ContactUpdateManyArgs>(
      args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(
      args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Result.GetResult<
        Prisma.$ContactPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
     **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ContactAggregateArgs>(
      args: Subset<T, ContactAggregateArgs>,
    ): Prisma.PrismaPromise<GetContactAggregateType<T>>;

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetContactGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Contact model
     */
    readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    conversations<T extends Contact$conversationsArgs<ExtArgs> = {}>(
      args?: Subset<T, Contact$conversationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ConversationPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<'Contact', 'String'>;
    readonly externalId: FieldRef<'Contact', 'String'>;
    readonly name: FieldRef<'Contact', 'String'>;
    readonly phoneNumber: FieldRef<'Contact', 'String'>;
    readonly createdAt: FieldRef<'Contact', 'DateTime'>;
    readonly updatedAt: FieldRef<'Contact', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput;
  };

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput;
  };

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[];
  };

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[];
  };

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[];
  };

  /**
   * Contact create
   */
  export type ContactCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>;
  };

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Contact update
   */
  export type ContactUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>;
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput;
  };

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>;
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput;
    /**
     * Limit how many Contacts to update.
     */
    limit?: number;
  };

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>;
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput;
    /**
     * Limit how many Contacts to update.
     */
    limit?: number;
  };

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput;
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>;
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>;
  };

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput;
  };

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput;
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number;
  };

  /**
   * Contact.conversations
   */
  export type Contact$conversationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    where?: ConversationWhereInput;
    orderBy?:
      | ConversationOrderByWithRelationInput
      | ConversationOrderByWithRelationInput[];
    cursor?: ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[];
  };

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null;
  };

  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
  };

  export type ConversationMinAggregateOutputType = {
    id: string | null;
    contactId: string | null;
    status: $Enums.ConversationStatus | null;
    locale: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ConversationMaxAggregateOutputType = {
    id: string | null;
    contactId: string | null;
    status: $Enums.ConversationStatus | null;
    locale: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ConversationCountAggregateOutputType = {
    id: number;
    contactId: number;
    status: number;
    locale: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ConversationMinAggregateInputType = {
    id?: true;
    contactId?: true;
    status?: true;
    locale?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ConversationMaxAggregateInputType = {
    id?: true;
    contactId?: true;
    status?: true;
    locale?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ConversationCountAggregateInputType = {
    id?: true;
    contactId?: true;
    status?: true;
    locale?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ConversationAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Conversations to fetch.
     */
    orderBy?:
      | ConversationOrderByWithRelationInput
      | ConversationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Conversations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Conversations
     **/
    _count?: true | ConversationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ConversationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ConversationMaxAggregateInputType;
  };

  export type GetConversationAggregateType<
    T extends ConversationAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>;
  };

  export type ConversationGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ConversationWhereInput;
    orderBy?:
      | ConversationOrderByWithAggregationInput
      | ConversationOrderByWithAggregationInput[];
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum;
    having?: ConversationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversationCountAggregateInputType | true;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
  };

  export type ConversationGroupByOutputType = {
    id: string;
    contactId: string;
    status: $Enums.ConversationStatus;
    locale: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
  };

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ConversationGroupByOutputType, T['by']> & {
          [
            P in keyof T & keyof ConversationGroupByOutputType
          ]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>;
        }
      >
    >;

  export type ConversationSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      contactId?: boolean;
      status?: boolean;
      locale?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      contact?: boolean | ContactDefaultArgs<ExtArgs>;
      messages?: boolean | Conversation$messagesArgs<ExtArgs>;
      aiRuns?: boolean | Conversation$aiRunsArgs<ExtArgs>;
      handoffs?: boolean | Conversation$handoffsArgs<ExtArgs>;
      _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['conversation']
  >;

  export type ConversationSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      contactId?: boolean;
      status?: boolean;
      locale?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      contact?: boolean | ContactDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['conversation']
  >;

  export type ConversationSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      contactId?: boolean;
      status?: boolean;
      locale?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      contact?: boolean | ContactDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['conversation']
  >;

  export type ConversationSelectScalar = {
    id?: boolean;
    contactId?: boolean;
    status?: boolean;
    locale?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ConversationOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'contactId' | 'status' | 'locale' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['conversation']
  >;
  export type ConversationInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    contact?: boolean | ContactDefaultArgs<ExtArgs>;
    messages?: boolean | Conversation$messagesArgs<ExtArgs>;
    aiRuns?: boolean | Conversation$aiRunsArgs<ExtArgs>;
    handoffs?: boolean | Conversation$handoffsArgs<ExtArgs>;
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ConversationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    contact?: boolean | ContactDefaultArgs<ExtArgs>;
  };
  export type ConversationIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    contact?: boolean | ContactDefaultArgs<ExtArgs>;
  };

  export type $ConversationPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Conversation';
    objects: {
      contact: Prisma.$ContactPayload<ExtArgs>;
      messages: Prisma.$MessagePayload<ExtArgs>[];
      aiRuns: Prisma.$AiRunPayload<ExtArgs>[];
      handoffs: Prisma.$HandoffPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        contactId: string;
        status: $Enums.ConversationStatus;
        locale: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['conversation']
    >;
    composites: {};
  };

  type ConversationGetPayload<
    S extends boolean | null | undefined | ConversationDefaultArgs,
  > = $Result.GetResult<Prisma.$ConversationPayload, S>;

  type ConversationCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ConversationFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ConversationCountAggregateInputType | true;
  };

  export interface ConversationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Conversation'];
      meta: { name: 'Conversation' };
    };
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(
      args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(
      args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     *
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ConversationFindManyArgs>(
      args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     *
     */
    create<T extends ConversationCreateArgs>(
      args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ConversationCreateManyArgs>(
      args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     *
     */
    delete<T extends ConversationDeleteArgs>(
      args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ConversationUpdateArgs>(
      args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ConversationDeleteManyArgs>(
      args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ConversationUpdateManyArgs>(
      args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(
      args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      $Result.GetResult<
        Prisma.$ConversationPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
     **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ConversationAggregateArgs>(
      args: Subset<T, ConversationAggregateArgs>,
    ): Prisma.PrismaPromise<GetConversationAggregateType<T>>;

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetConversationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Conversation model
     */
    readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    contact<T extends ContactDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ContactDefaultArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      | $Result.GetResult<
          Prisma.$ContactPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(
      args?: Subset<T, Conversation$messagesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    aiRuns<T extends Conversation$aiRunsArgs<ExtArgs> = {}>(
      args?: Subset<T, Conversation$aiRunsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AiRunPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    handoffs<T extends Conversation$handoffsArgs<ExtArgs> = {}>(
      args?: Subset<T, Conversation$handoffsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$HandoffPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<'Conversation', 'String'>;
    readonly contactId: FieldRef<'Conversation', 'String'>;
    readonly status: FieldRef<'Conversation', 'ConversationStatus'>;
    readonly locale: FieldRef<'Conversation', 'String'>;
    readonly createdAt: FieldRef<'Conversation', 'DateTime'>;
    readonly updatedAt: FieldRef<'Conversation', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput;
  };

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput;
  };

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Conversations to fetch.
     */
    orderBy?:
      | ConversationOrderByWithRelationInput
      | ConversationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Conversations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[];
  };

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Conversations to fetch.
     */
    orderBy?:
      | ConversationOrderByWithRelationInput
      | ConversationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Conversations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[];
  };

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Conversations to fetch.
     */
    orderBy?:
      | ConversationOrderByWithRelationInput
      | ConversationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Conversations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[];
  };

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>;
  };

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>;
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput;
  };

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<
      ConversationUpdateManyMutationInput,
      ConversationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput;
    /**
     * Limit how many Conversations to update.
     */
    limit?: number;
  };

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * The data used to update Conversations.
     */
    data: XOR<
      ConversationUpdateManyMutationInput,
      ConversationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput;
    /**
     * Limit how many Conversations to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput;
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>;
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>;
  };

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput;
  };

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput;
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number;
  };

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
    orderBy?:
      MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[];
    cursor?: MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Conversation.aiRuns
   */
  export type Conversation$aiRunsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    where?: AiRunWhereInput;
    orderBy?: AiRunOrderByWithRelationInput | AiRunOrderByWithRelationInput[];
    cursor?: AiRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AiRunScalarFieldEnum | AiRunScalarFieldEnum[];
  };

  /**
   * Conversation.handoffs
   */
  export type Conversation$handoffsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    where?: HandoffWhereInput;
    orderBy?:
      HandoffOrderByWithRelationInput | HandoffOrderByWithRelationInput[];
    cursor?: HandoffWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: HandoffScalarFieldEnum | HandoffScalarFieldEnum[];
  };

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null;
  };

  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  export type MessageMinAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    direction: $Enums.MessageDirection | null;
    type: $Enums.MessageType | null;
    providerMessageId: string | null;
    text: string | null;
    status: $Enums.MessageStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MessageMaxAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    direction: $Enums.MessageDirection | null;
    type: $Enums.MessageType | null;
    providerMessageId: string | null;
    text: string | null;
    status: $Enums.MessageStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MessageCountAggregateOutputType = {
    id: number;
    conversationId: number;
    direction: number;
    type: number;
    providerMessageId: number;
    text: number;
    status: number;
    metadata: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type MessageMinAggregateInputType = {
    id?: true;
    conversationId?: true;
    direction?: true;
    type?: true;
    providerMessageId?: true;
    text?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MessageMaxAggregateInputType = {
    id?: true;
    conversationId?: true;
    direction?: true;
    type?: true;
    providerMessageId?: true;
    text?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MessageCountAggregateInputType = {
    id?: true;
    conversationId?: true;
    direction?: true;
    type?: true;
    providerMessageId?: true;
    text?: true;
    status?: true;
    metadata?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type MessageAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Messages
     **/
    _count?: true | MessageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MessageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MessageMaxAggregateInputType;
  };

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>;
  };

  export type MessageGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
    orderBy?:
      MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[];
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum;
    having?: MessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
  };

  export type MessageGroupByOutputType = {
    id: string;
    conversationId: string;
    direction: $Enums.MessageDirection;
    type: $Enums.MessageType;
    providerMessageId: string | null;
    text: string | null;
    status: $Enums.MessageStatus;
    metadata: JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MessageGroupByOutputType, T['by']> & {
          [P in keyof T & keyof MessageGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>;
        }
      >
    >;

  export type MessageSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      direction?: boolean;
      type?: boolean;
      providerMessageId?: boolean;
      text?: boolean;
      status?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      direction?: boolean;
      type?: boolean;
      providerMessageId?: boolean;
      text?: boolean;
      status?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      direction?: boolean;
      type?: boolean;
      providerMessageId?: boolean;
      text?: boolean;
      status?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectScalar = {
    id?: boolean;
    conversationId?: boolean;
    direction?: boolean;
    type?: boolean;
    providerMessageId?: boolean;
    text?: boolean;
    status?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type MessageOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'conversationId'
    | 'direction'
    | 'type'
    | 'providerMessageId'
    | 'text'
    | 'status'
    | 'metadata'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['message']
  >;
  export type MessageInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };
  export type MessageIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };
  export type MessageIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };

  export type $MessagePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Message';
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        conversationId: string;
        direction: $Enums.MessageDirection;
        type: $Enums.MessageType;
        providerMessageId: string | null;
        text: string | null;
        status: $Enums.MessageStatus;
        metadata: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['message']
    >;
    composites: {};
  };

  type MessageGetPayload<
    S extends boolean | null | undefined | MessageDefaultArgs,
  > = $Result.GetResult<Prisma.$MessagePayload, S>;

  type MessageCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageCountAggregateInputType | true;
  };

  export interface MessageDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Message'];
      meta: { name: 'Message' };
    };
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(
      args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(
      args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     *
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MessageFindManyArgs>(
      args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     *
     */
    create<T extends MessageCreateArgs>(
      args: SelectSubset<T, MessageCreateArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MessageCreateManyArgs>(
      args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     *
     */
    delete<T extends MessageDeleteArgs>(
      args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MessageUpdateArgs>(
      args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MessageDeleteManyArgs>(
      args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MessageUpdateManyArgs>(
      args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(
      args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
     **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MessageAggregateArgs>(
      args: Subset<T, MessageAggregateArgs>,
    ): Prisma.PrismaPromise<GetMessageAggregateType<T>>;

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetMessageGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Message model
     */
    readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ConversationDefaultArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      | $Result.GetResult<
          Prisma.$ConversationPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<'Message', 'String'>;
    readonly conversationId: FieldRef<'Message', 'String'>;
    readonly direction: FieldRef<'Message', 'MessageDirection'>;
    readonly type: FieldRef<'Message', 'MessageType'>;
    readonly providerMessageId: FieldRef<'Message', 'String'>;
    readonly text: FieldRef<'Message', 'String'>;
    readonly status: FieldRef<'Message', 'MessageStatus'>;
    readonly metadata: FieldRef<'Message', 'Json'>;
    readonly createdAt: FieldRef<'Message', 'DateTime'>;
    readonly updatedAt: FieldRef<'Message', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message create
   */
  export type MessageCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
  };

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message update
   */
  export type MessageUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
  };

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput;
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
  };

  /**
   * Message delete
   */
  export type MessageDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to delete.
     */
    limit?: number;
  };

  /**
   * Message without action
   */
  export type MessageDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
  };

  /**
   * Model WebhookEvent
   */

  export type AggregateWebhookEvent = {
    _count: WebhookEventCountAggregateOutputType | null;
    _min: WebhookEventMinAggregateOutputType | null;
    _max: WebhookEventMaxAggregateOutputType | null;
  };

  export type WebhookEventMinAggregateOutputType = {
    id: string | null;
    externalId: string | null;
    provider: string | null;
    eventType: string | null;
    status: $Enums.WebhookStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WebhookEventMaxAggregateOutputType = {
    id: string | null;
    externalId: string | null;
    provider: string | null;
    eventType: string | null;
    status: $Enums.WebhookStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WebhookEventCountAggregateOutputType = {
    id: number;
    externalId: number;
    provider: number;
    eventType: number;
    status: number;
    payload: number;
    headers: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type WebhookEventMinAggregateInputType = {
    id?: true;
    externalId?: true;
    provider?: true;
    eventType?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WebhookEventMaxAggregateInputType = {
    id?: true;
    externalId?: true;
    provider?: true;
    eventType?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WebhookEventCountAggregateInputType = {
    id?: true;
    externalId?: true;
    provider?: true;
    eventType?: true;
    status?: true;
    payload?: true;
    headers?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type WebhookEventAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WebhookEvent to aggregate.
     */
    where?: WebhookEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?:
      | WebhookEventOrderByWithRelationInput
      | WebhookEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WebhookEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WebhookEvents
     **/
    _count?: true | WebhookEventCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WebhookEventMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WebhookEventMaxAggregateInputType;
  };

  export type GetWebhookEventAggregateType<
    T extends WebhookEventAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateWebhookEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEvent[P]>
      : GetScalarType<T[P], AggregateWebhookEvent[P]>;
  };

  export type WebhookEventGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WebhookEventWhereInput;
    orderBy?:
      | WebhookEventOrderByWithAggregationInput
      | WebhookEventOrderByWithAggregationInput[];
    by: WebhookEventScalarFieldEnum[] | WebhookEventScalarFieldEnum;
    having?: WebhookEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WebhookEventCountAggregateInputType | true;
    _min?: WebhookEventMinAggregateInputType;
    _max?: WebhookEventMaxAggregateInputType;
  };

  export type WebhookEventGroupByOutputType = {
    id: string;
    externalId: string;
    provider: string;
    eventType: string;
    status: $Enums.WebhookStatus;
    payload: JsonValue;
    headers: JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: WebhookEventCountAggregateOutputType | null;
    _min: WebhookEventMinAggregateOutputType | null;
    _max: WebhookEventMaxAggregateOutputType | null;
  };

  type GetWebhookEventGroupByPayload<T extends WebhookEventGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<WebhookEventGroupByOutputType, T['by']> & {
          [
            P in keyof T & keyof WebhookEventGroupByOutputType
          ]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>;
        }
      >
    >;

  export type WebhookEventSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      externalId?: boolean;
      provider?: boolean;
      eventType?: boolean;
      status?: boolean;
      payload?: boolean;
      headers?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['webhookEvent']
  >;

  export type WebhookEventSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      externalId?: boolean;
      provider?: boolean;
      eventType?: boolean;
      status?: boolean;
      payload?: boolean;
      headers?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['webhookEvent']
  >;

  export type WebhookEventSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      externalId?: boolean;
      provider?: boolean;
      eventType?: boolean;
      status?: boolean;
      payload?: boolean;
      headers?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['webhookEvent']
  >;

  export type WebhookEventSelectScalar = {
    id?: boolean;
    externalId?: boolean;
    provider?: boolean;
    eventType?: boolean;
    status?: boolean;
    payload?: boolean;
    headers?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type WebhookEventOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'externalId'
    | 'provider'
    | 'eventType'
    | 'status'
    | 'payload'
    | 'headers'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['webhookEvent']
  >;

  export type $WebhookEventPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'WebhookEvent';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        externalId: string;
        provider: string;
        eventType: string;
        status: $Enums.WebhookStatus;
        payload: Prisma.JsonValue;
        headers: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['webhookEvent']
    >;
    composites: {};
  };

  type WebhookEventGetPayload<
    S extends boolean | null | undefined | WebhookEventDefaultArgs,
  > = $Result.GetResult<Prisma.$WebhookEventPayload, S>;

  type WebhookEventCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    WebhookEventFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: WebhookEventCountAggregateInputType | true;
  };

  export interface WebhookEventDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['WebhookEvent'];
      meta: { name: 'WebhookEvent' };
    };
    /**
     * Find zero or one WebhookEvent that matches the filter.
     * @param {WebhookEventFindUniqueArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEventFindUniqueArgs>(
      args: SelectSubset<T, WebhookEventFindUniqueArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one WebhookEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEventFindUniqueOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEventFindUniqueOrThrowArgs>(
      args: SelectSubset<T, WebhookEventFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WebhookEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEventFindFirstArgs>(
      args?: SelectSubset<T, WebhookEventFindFirstArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WebhookEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEventFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WebhookEventFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more WebhookEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany()
     *
     * // Get first 10 WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WebhookEventFindManyArgs>(
      args?: SelectSubset<T, WebhookEventFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a WebhookEvent.
     * @param {WebhookEventCreateArgs} args - Arguments to create a WebhookEvent.
     * @example
     * // Create one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.create({
     *   data: {
     *     // ... data to create a WebhookEvent
     *   }
     * })
     *
     */
    create<T extends WebhookEventCreateArgs>(
      args: SelectSubset<T, WebhookEventCreateArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many WebhookEvents.
     * @param {WebhookEventCreateManyArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WebhookEventCreateManyArgs>(
      args?: SelectSubset<T, WebhookEventCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many WebhookEvents and returns the data saved in the database.
     * @param {WebhookEventCreateManyAndReturnArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WebhookEventCreateManyAndReturnArgs>(
      args?: SelectSubset<T, WebhookEventCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a WebhookEvent.
     * @param {WebhookEventDeleteArgs} args - Arguments to delete one WebhookEvent.
     * @example
     * // Delete one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.delete({
     *   where: {
     *     // ... filter to delete one WebhookEvent
     *   }
     * })
     *
     */
    delete<T extends WebhookEventDeleteArgs>(
      args: SelectSubset<T, WebhookEventDeleteArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one WebhookEvent.
     * @param {WebhookEventUpdateArgs} args - Arguments to update one WebhookEvent.
     * @example
     * // Update one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WebhookEventUpdateArgs>(
      args: SelectSubset<T, WebhookEventUpdateArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more WebhookEvents.
     * @param {WebhookEventDeleteManyArgs} args - Arguments to filter WebhookEvents to delete.
     * @example
     * // Delete a few WebhookEvents
     * const { count } = await prisma.webhookEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WebhookEventDeleteManyArgs>(
      args?: SelectSubset<T, WebhookEventDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WebhookEventUpdateManyArgs>(
      args: SelectSubset<T, WebhookEventUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WebhookEvents and returns the data updated in the database.
     * @param {WebhookEventUpdateManyAndReturnArgs} args - Arguments to update many WebhookEvents.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends WebhookEventUpdateManyAndReturnArgs>(
      args: SelectSubset<T, WebhookEventUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one WebhookEvent.
     * @param {WebhookEventUpsertArgs} args - Arguments to update or create a WebhookEvent.
     * @example
     * // Update or create a WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.upsert({
     *   create: {
     *     // ... data to create a WebhookEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEvent we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEventUpsertArgs>(
      args: SelectSubset<T, WebhookEventUpsertArgs<ExtArgs>>,
    ): Prisma__WebhookEventClient<
      $Result.GetResult<
        Prisma.$WebhookEventPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventCountArgs} args - Arguments to filter WebhookEvents to count.
     * @example
     * // Count the number of WebhookEvents
     * const count = await prisma.webhookEvent.count({
     *   where: {
     *     // ... the filter for the WebhookEvents we want to count
     *   }
     * })
     **/
    count<T extends WebhookEventCountArgs>(
      args?: Subset<T, WebhookEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEventCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends WebhookEventAggregateArgs>(
      args: Subset<T, WebhookEventAggregateArgs>,
    ): Prisma.PrismaPromise<GetWebhookEventAggregateType<T>>;

    /**
     * Group by WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends WebhookEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: WebhookEventGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEventGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, WebhookEventGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetWebhookEventGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WebhookEvent model
     */
    readonly fields: WebhookEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEventClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the WebhookEvent model
   */
  interface WebhookEventFieldRefs {
    readonly id: FieldRef<'WebhookEvent', 'String'>;
    readonly externalId: FieldRef<'WebhookEvent', 'String'>;
    readonly provider: FieldRef<'WebhookEvent', 'String'>;
    readonly eventType: FieldRef<'WebhookEvent', 'String'>;
    readonly status: FieldRef<'WebhookEvent', 'WebhookStatus'>;
    readonly payload: FieldRef<'WebhookEvent', 'Json'>;
    readonly headers: FieldRef<'WebhookEvent', 'Json'>;
    readonly createdAt: FieldRef<'WebhookEvent', 'DateTime'>;
    readonly updatedAt: FieldRef<'WebhookEvent', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * WebhookEvent findUnique
   */
  export type WebhookEventFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput;
  };

  /**
   * WebhookEvent findUniqueOrThrow
   */
  export type WebhookEventFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput;
  };

  /**
   * WebhookEvent findFirst
   */
  export type WebhookEventFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?:
      | WebhookEventOrderByWithRelationInput
      | WebhookEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[];
  };

  /**
   * WebhookEvent findFirstOrThrow
   */
  export type WebhookEventFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?:
      | WebhookEventOrderByWithRelationInput
      | WebhookEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[];
  };

  /**
   * WebhookEvent findMany
   */
  export type WebhookEventFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * Filter, which WebhookEvents to fetch.
     */
    where?: WebhookEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?:
      | WebhookEventOrderByWithRelationInput
      | WebhookEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WebhookEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[];
  };

  /**
   * WebhookEvent create
   */
  export type WebhookEventCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * The data needed to create a WebhookEvent.
     */
    data: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>;
  };

  /**
   * WebhookEvent createMany
   */
  export type WebhookEventCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WebhookEvent createManyAndReturn
   */
  export type WebhookEventCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WebhookEvent update
   */
  export type WebhookEventUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * The data needed to update a WebhookEvent.
     */
    data: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>;
    /**
     * Choose, which WebhookEvent to update.
     */
    where: WebhookEventWhereUniqueInput;
  };

  /**
   * WebhookEvent updateMany
   */
  export type WebhookEventUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<
      WebhookEventUpdateManyMutationInput,
      WebhookEventUncheckedUpdateManyInput
    >;
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput;
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number;
  };

  /**
   * WebhookEvent updateManyAndReturn
   */
  export type WebhookEventUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<
      WebhookEventUpdateManyMutationInput,
      WebhookEventUncheckedUpdateManyInput
    >;
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput;
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number;
  };

  /**
   * WebhookEvent upsert
   */
  export type WebhookEventUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * The filter to search for the WebhookEvent to update in case it exists.
     */
    where: WebhookEventWhereUniqueInput;
    /**
     * In case the WebhookEvent found by the `where` argument doesn't exist, create a new WebhookEvent with this data.
     */
    create: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>;
    /**
     * In case the WebhookEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>;
  };

  /**
   * WebhookEvent delete
   */
  export type WebhookEventDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
    /**
     * Filter which WebhookEvent to delete.
     */
    where: WebhookEventWhereUniqueInput;
  };

  /**
   * WebhookEvent deleteMany
   */
  export type WebhookEventDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WebhookEvents to delete
     */
    where?: WebhookEventWhereInput;
    /**
     * Limit how many WebhookEvents to delete.
     */
    limit?: number;
  };

  /**
   * WebhookEvent without action
   */
  export type WebhookEventDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null;
  };

  /**
   * Model AiRun
   */

  export type AggregateAiRun = {
    _count: AiRunCountAggregateOutputType | null;
    _avg: AiRunAvgAggregateOutputType | null;
    _sum: AiRunSumAggregateOutputType | null;
    _min: AiRunMinAggregateOutputType | null;
    _max: AiRunMaxAggregateOutputType | null;
  };

  export type AiRunAvgAggregateOutputType = {
    inputTokens: number | null;
    outputTokens: number | null;
    totalTokens: number | null;
  };

  export type AiRunSumAggregateOutputType = {
    inputTokens: number | null;
    outputTokens: number | null;
    totalTokens: number | null;
  };

  export type AiRunMinAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    provider: string | null;
    model: string | null;
    providerResponseId: string | null;
    status: $Enums.AiRunStatus | null;
    inputTokens: number | null;
    outputTokens: number | null;
    totalTokens: number | null;
    error: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
  };

  export type AiRunMaxAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    provider: string | null;
    model: string | null;
    providerResponseId: string | null;
    status: $Enums.AiRunStatus | null;
    inputTokens: number | null;
    outputTokens: number | null;
    totalTokens: number | null;
    error: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
  };

  export type AiRunCountAggregateOutputType = {
    id: number;
    conversationId: number;
    provider: number;
    model: number;
    providerResponseId: number;
    status: number;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    error: number;
    createdAt: number;
    completedAt: number;
    _all: number;
  };

  export type AiRunAvgAggregateInputType = {
    inputTokens?: true;
    outputTokens?: true;
    totalTokens?: true;
  };

  export type AiRunSumAggregateInputType = {
    inputTokens?: true;
    outputTokens?: true;
    totalTokens?: true;
  };

  export type AiRunMinAggregateInputType = {
    id?: true;
    conversationId?: true;
    provider?: true;
    model?: true;
    providerResponseId?: true;
    status?: true;
    inputTokens?: true;
    outputTokens?: true;
    totalTokens?: true;
    error?: true;
    createdAt?: true;
    completedAt?: true;
  };

  export type AiRunMaxAggregateInputType = {
    id?: true;
    conversationId?: true;
    provider?: true;
    model?: true;
    providerResponseId?: true;
    status?: true;
    inputTokens?: true;
    outputTokens?: true;
    totalTokens?: true;
    error?: true;
    createdAt?: true;
    completedAt?: true;
  };

  export type AiRunCountAggregateInputType = {
    id?: true;
    conversationId?: true;
    provider?: true;
    model?: true;
    providerResponseId?: true;
    status?: true;
    inputTokens?: true;
    outputTokens?: true;
    totalTokens?: true;
    error?: true;
    createdAt?: true;
    completedAt?: true;
    _all?: true;
  };

  export type AiRunAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AiRun to aggregate.
     */
    where?: AiRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AiRuns to fetch.
     */
    orderBy?: AiRunOrderByWithRelationInput | AiRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AiRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AiRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AiRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AiRuns
     **/
    _count?: true | AiRunCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AiRunAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AiRunSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AiRunMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AiRunMaxAggregateInputType;
  };

  export type GetAiRunAggregateType<T extends AiRunAggregateArgs> = {
    [P in keyof T & keyof AggregateAiRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiRun[P]>
      : GetScalarType<T[P], AggregateAiRun[P]>;
  };

  export type AiRunGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AiRunWhereInput;
    orderBy?:
      AiRunOrderByWithAggregationInput | AiRunOrderByWithAggregationInput[];
    by: AiRunScalarFieldEnum[] | AiRunScalarFieldEnum;
    having?: AiRunScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AiRunCountAggregateInputType | true;
    _avg?: AiRunAvgAggregateInputType;
    _sum?: AiRunSumAggregateInputType;
    _min?: AiRunMinAggregateInputType;
    _max?: AiRunMaxAggregateInputType;
  };

  export type AiRunGroupByOutputType = {
    id: string;
    conversationId: string;
    provider: string;
    model: string;
    providerResponseId: string | null;
    status: $Enums.AiRunStatus;
    inputTokens: number | null;
    outputTokens: number | null;
    totalTokens: number | null;
    error: string | null;
    createdAt: Date;
    completedAt: Date | null;
    _count: AiRunCountAggregateOutputType | null;
    _avg: AiRunAvgAggregateOutputType | null;
    _sum: AiRunSumAggregateOutputType | null;
    _min: AiRunMinAggregateOutputType | null;
    _max: AiRunMaxAggregateOutputType | null;
  };

  type GetAiRunGroupByPayload<T extends AiRunGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AiRunGroupByOutputType, T['by']> & {
          [P in keyof T & keyof AiRunGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiRunGroupByOutputType[P]>
            : GetScalarType<T[P], AiRunGroupByOutputType[P]>;
        }
      >
    >;

  export type AiRunSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      provider?: boolean;
      model?: boolean;
      providerResponseId?: boolean;
      status?: boolean;
      inputTokens?: boolean;
      outputTokens?: boolean;
      totalTokens?: boolean;
      error?: boolean;
      createdAt?: boolean;
      completedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
      toolExecutions?: boolean | AiRun$toolExecutionsArgs<ExtArgs>;
      _count?: boolean | AiRunCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['aiRun']
  >;

  export type AiRunSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      provider?: boolean;
      model?: boolean;
      providerResponseId?: boolean;
      status?: boolean;
      inputTokens?: boolean;
      outputTokens?: boolean;
      totalTokens?: boolean;
      error?: boolean;
      createdAt?: boolean;
      completedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['aiRun']
  >;

  export type AiRunSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      provider?: boolean;
      model?: boolean;
      providerResponseId?: boolean;
      status?: boolean;
      inputTokens?: boolean;
      outputTokens?: boolean;
      totalTokens?: boolean;
      error?: boolean;
      createdAt?: boolean;
      completedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['aiRun']
  >;

  export type AiRunSelectScalar = {
    id?: boolean;
    conversationId?: boolean;
    provider?: boolean;
    model?: boolean;
    providerResponseId?: boolean;
    status?: boolean;
    inputTokens?: boolean;
    outputTokens?: boolean;
    totalTokens?: boolean;
    error?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
  };

  export type AiRunOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'conversationId'
    | 'provider'
    | 'model'
    | 'providerResponseId'
    | 'status'
    | 'inputTokens'
    | 'outputTokens'
    | 'totalTokens'
    | 'error'
    | 'createdAt'
    | 'completedAt',
    ExtArgs['result']['aiRun']
  >;
  export type AiRunInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    toolExecutions?: boolean | AiRun$toolExecutionsArgs<ExtArgs>;
    _count?: boolean | AiRunCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type AiRunIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };
  export type AiRunIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };

  export type $AiRunPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'AiRun';
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>;
      toolExecutions: Prisma.$ToolExecutionPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        conversationId: string;
        provider: string;
        model: string;
        providerResponseId: string | null;
        status: $Enums.AiRunStatus;
        inputTokens: number | null;
        outputTokens: number | null;
        totalTokens: number | null;
        error: string | null;
        createdAt: Date;
        completedAt: Date | null;
      },
      ExtArgs['result']['aiRun']
    >;
    composites: {};
  };

  type AiRunGetPayload<
    S extends boolean | null | undefined | AiRunDefaultArgs,
  > = $Result.GetResult<Prisma.$AiRunPayload, S>;

  type AiRunCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AiRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AiRunCountAggregateInputType | true;
  };

  export interface AiRunDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['AiRun'];
      meta: { name: 'AiRun' };
    };
    /**
     * Find zero or one AiRun that matches the filter.
     * @param {AiRunFindUniqueArgs} args - Arguments to find a AiRun
     * @example
     * // Get one AiRun
     * const aiRun = await prisma.aiRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiRunFindUniqueArgs>(
      args: SelectSubset<T, AiRunFindUniqueArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one AiRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiRunFindUniqueOrThrowArgs} args - Arguments to find a AiRun
     * @example
     * // Get one AiRun
     * const aiRun = await prisma.aiRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiRunFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AiRunFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AiRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRunFindFirstArgs} args - Arguments to find a AiRun
     * @example
     * // Get one AiRun
     * const aiRun = await prisma.aiRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiRunFindFirstArgs>(
      args?: SelectSubset<T, AiRunFindFirstArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AiRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRunFindFirstOrThrowArgs} args - Arguments to find a AiRun
     * @example
     * // Get one AiRun
     * const aiRun = await prisma.aiRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiRunFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AiRunFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more AiRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiRuns
     * const aiRuns = await prisma.aiRun.findMany()
     *
     * // Get first 10 AiRuns
     * const aiRuns = await prisma.aiRun.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const aiRunWithIdOnly = await prisma.aiRun.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AiRunFindManyArgs>(
      args?: SelectSubset<T, AiRunFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a AiRun.
     * @param {AiRunCreateArgs} args - Arguments to create a AiRun.
     * @example
     * // Create one AiRun
     * const AiRun = await prisma.aiRun.create({
     *   data: {
     *     // ... data to create a AiRun
     *   }
     * })
     *
     */
    create<T extends AiRunCreateArgs>(
      args: SelectSubset<T, AiRunCreateArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many AiRuns.
     * @param {AiRunCreateManyArgs} args - Arguments to create many AiRuns.
     * @example
     * // Create many AiRuns
     * const aiRun = await prisma.aiRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AiRunCreateManyArgs>(
      args?: SelectSubset<T, AiRunCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many AiRuns and returns the data saved in the database.
     * @param {AiRunCreateManyAndReturnArgs} args - Arguments to create many AiRuns.
     * @example
     * // Create many AiRuns
     * const aiRun = await prisma.aiRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AiRuns and only return the `id`
     * const aiRunWithIdOnly = await prisma.aiRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AiRunCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AiRunCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a AiRun.
     * @param {AiRunDeleteArgs} args - Arguments to delete one AiRun.
     * @example
     * // Delete one AiRun
     * const AiRun = await prisma.aiRun.delete({
     *   where: {
     *     // ... filter to delete one AiRun
     *   }
     * })
     *
     */
    delete<T extends AiRunDeleteArgs>(
      args: SelectSubset<T, AiRunDeleteArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one AiRun.
     * @param {AiRunUpdateArgs} args - Arguments to update one AiRun.
     * @example
     * // Update one AiRun
     * const aiRun = await prisma.aiRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AiRunUpdateArgs>(
      args: SelectSubset<T, AiRunUpdateArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more AiRuns.
     * @param {AiRunDeleteManyArgs} args - Arguments to filter AiRuns to delete.
     * @example
     * // Delete a few AiRuns
     * const { count } = await prisma.aiRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AiRunDeleteManyArgs>(
      args?: SelectSubset<T, AiRunDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AiRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiRuns
     * const aiRun = await prisma.aiRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AiRunUpdateManyArgs>(
      args: SelectSubset<T, AiRunUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AiRuns and returns the data updated in the database.
     * @param {AiRunUpdateManyAndReturnArgs} args - Arguments to update many AiRuns.
     * @example
     * // Update many AiRuns
     * const aiRun = await prisma.aiRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AiRuns and only return the `id`
     * const aiRunWithIdOnly = await prisma.aiRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AiRunUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AiRunUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one AiRun.
     * @param {AiRunUpsertArgs} args - Arguments to update or create a AiRun.
     * @example
     * // Update or create a AiRun
     * const aiRun = await prisma.aiRun.upsert({
     *   create: {
     *     // ... data to create a AiRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiRun we want to update
     *   }
     * })
     */
    upsert<T extends AiRunUpsertArgs>(
      args: SelectSubset<T, AiRunUpsertArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      $Result.GetResult<
        Prisma.$AiRunPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of AiRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRunCountArgs} args - Arguments to filter AiRuns to count.
     * @example
     * // Count the number of AiRuns
     * const count = await prisma.aiRun.count({
     *   where: {
     *     // ... the filter for the AiRuns we want to count
     *   }
     * })
     **/
    count<T extends AiRunCountArgs>(
      args?: Subset<T, AiRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiRunCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a AiRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AiRunAggregateArgs>(
      args: Subset<T, AiRunAggregateArgs>,
    ): Prisma.PrismaPromise<GetAiRunAggregateType<T>>;

    /**
     * Group by AiRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AiRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: AiRunGroupByArgs['orderBy'] }
        : { orderBy?: AiRunGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, AiRunGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetAiRunGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AiRun model
     */
    readonly fields: AiRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiRunClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ConversationDefaultArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      | $Result.GetResult<
          Prisma.$ConversationPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    toolExecutions<T extends AiRun$toolExecutionsArgs<ExtArgs> = {}>(
      args?: Subset<T, AiRun$toolExecutionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ToolExecutionPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the AiRun model
   */
  interface AiRunFieldRefs {
    readonly id: FieldRef<'AiRun', 'String'>;
    readonly conversationId: FieldRef<'AiRun', 'String'>;
    readonly provider: FieldRef<'AiRun', 'String'>;
    readonly model: FieldRef<'AiRun', 'String'>;
    readonly providerResponseId: FieldRef<'AiRun', 'String'>;
    readonly status: FieldRef<'AiRun', 'AiRunStatus'>;
    readonly inputTokens: FieldRef<'AiRun', 'Int'>;
    readonly outputTokens: FieldRef<'AiRun', 'Int'>;
    readonly totalTokens: FieldRef<'AiRun', 'Int'>;
    readonly error: FieldRef<'AiRun', 'String'>;
    readonly createdAt: FieldRef<'AiRun', 'DateTime'>;
    readonly completedAt: FieldRef<'AiRun', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * AiRun findUnique
   */
  export type AiRunFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * Filter, which AiRun to fetch.
     */
    where: AiRunWhereUniqueInput;
  };

  /**
   * AiRun findUniqueOrThrow
   */
  export type AiRunFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * Filter, which AiRun to fetch.
     */
    where: AiRunWhereUniqueInput;
  };

  /**
   * AiRun findFirst
   */
  export type AiRunFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * Filter, which AiRun to fetch.
     */
    where?: AiRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AiRuns to fetch.
     */
    orderBy?: AiRunOrderByWithRelationInput | AiRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AiRuns.
     */
    cursor?: AiRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AiRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AiRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AiRuns.
     */
    distinct?: AiRunScalarFieldEnum | AiRunScalarFieldEnum[];
  };

  /**
   * AiRun findFirstOrThrow
   */
  export type AiRunFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * Filter, which AiRun to fetch.
     */
    where?: AiRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AiRuns to fetch.
     */
    orderBy?: AiRunOrderByWithRelationInput | AiRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AiRuns.
     */
    cursor?: AiRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AiRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AiRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AiRuns.
     */
    distinct?: AiRunScalarFieldEnum | AiRunScalarFieldEnum[];
  };

  /**
   * AiRun findMany
   */
  export type AiRunFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * Filter, which AiRuns to fetch.
     */
    where?: AiRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AiRuns to fetch.
     */
    orderBy?: AiRunOrderByWithRelationInput | AiRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AiRuns.
     */
    cursor?: AiRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AiRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AiRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AiRuns.
     */
    distinct?: AiRunScalarFieldEnum | AiRunScalarFieldEnum[];
  };

  /**
   * AiRun create
   */
  export type AiRunCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * The data needed to create a AiRun.
     */
    data: XOR<AiRunCreateInput, AiRunUncheckedCreateInput>;
  };

  /**
   * AiRun createMany
   */
  export type AiRunCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many AiRuns.
     */
    data: AiRunCreateManyInput | AiRunCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * AiRun createManyAndReturn
   */
  export type AiRunCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * The data used to create many AiRuns.
     */
    data: AiRunCreateManyInput | AiRunCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AiRun update
   */
  export type AiRunUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * The data needed to update a AiRun.
     */
    data: XOR<AiRunUpdateInput, AiRunUncheckedUpdateInput>;
    /**
     * Choose, which AiRun to update.
     */
    where: AiRunWhereUniqueInput;
  };

  /**
   * AiRun updateMany
   */
  export type AiRunUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update AiRuns.
     */
    data: XOR<AiRunUpdateManyMutationInput, AiRunUncheckedUpdateManyInput>;
    /**
     * Filter which AiRuns to update
     */
    where?: AiRunWhereInput;
    /**
     * Limit how many AiRuns to update.
     */
    limit?: number;
  };

  /**
   * AiRun updateManyAndReturn
   */
  export type AiRunUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * The data used to update AiRuns.
     */
    data: XOR<AiRunUpdateManyMutationInput, AiRunUncheckedUpdateManyInput>;
    /**
     * Filter which AiRuns to update
     */
    where?: AiRunWhereInput;
    /**
     * Limit how many AiRuns to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AiRun upsert
   */
  export type AiRunUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * The filter to search for the AiRun to update in case it exists.
     */
    where: AiRunWhereUniqueInput;
    /**
     * In case the AiRun found by the `where` argument doesn't exist, create a new AiRun with this data.
     */
    create: XOR<AiRunCreateInput, AiRunUncheckedCreateInput>;
    /**
     * In case the AiRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiRunUpdateInput, AiRunUncheckedUpdateInput>;
  };

  /**
   * AiRun delete
   */
  export type AiRunDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
    /**
     * Filter which AiRun to delete.
     */
    where: AiRunWhereUniqueInput;
  };

  /**
   * AiRun deleteMany
   */
  export type AiRunDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AiRuns to delete
     */
    where?: AiRunWhereInput;
    /**
     * Limit how many AiRuns to delete.
     */
    limit?: number;
  };

  /**
   * AiRun.toolExecutions
   */
  export type AiRun$toolExecutionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    where?: ToolExecutionWhereInput;
    orderBy?:
      | ToolExecutionOrderByWithRelationInput
      | ToolExecutionOrderByWithRelationInput[];
    cursor?: ToolExecutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ToolExecutionScalarFieldEnum | ToolExecutionScalarFieldEnum[];
  };

  /**
   * AiRun without action
   */
  export type AiRunDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AiRun
     */
    select?: AiRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AiRun
     */
    omit?: AiRunOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRunInclude<ExtArgs> | null;
  };

  /**
   * Model ToolExecution
   */

  export type AggregateToolExecution = {
    _count: ToolExecutionCountAggregateOutputType | null;
    _min: ToolExecutionMinAggregateOutputType | null;
    _max: ToolExecutionMaxAggregateOutputType | null;
  };

  export type ToolExecutionMinAggregateOutputType = {
    id: string | null;
    aiRunId: string | null;
    toolName: string | null;
    status: $Enums.ToolExecutionStatus | null;
    error: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
  };

  export type ToolExecutionMaxAggregateOutputType = {
    id: string | null;
    aiRunId: string | null;
    toolName: string | null;
    status: $Enums.ToolExecutionStatus | null;
    error: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
  };

  export type ToolExecutionCountAggregateOutputType = {
    id: number;
    aiRunId: number;
    toolName: number;
    input: number;
    output: number;
    status: number;
    error: number;
    createdAt: number;
    completedAt: number;
    _all: number;
  };

  export type ToolExecutionMinAggregateInputType = {
    id?: true;
    aiRunId?: true;
    toolName?: true;
    status?: true;
    error?: true;
    createdAt?: true;
    completedAt?: true;
  };

  export type ToolExecutionMaxAggregateInputType = {
    id?: true;
    aiRunId?: true;
    toolName?: true;
    status?: true;
    error?: true;
    createdAt?: true;
    completedAt?: true;
  };

  export type ToolExecutionCountAggregateInputType = {
    id?: true;
    aiRunId?: true;
    toolName?: true;
    input?: true;
    output?: true;
    status?: true;
    error?: true;
    createdAt?: true;
    completedAt?: true;
    _all?: true;
  };

  export type ToolExecutionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ToolExecution to aggregate.
     */
    where?: ToolExecutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ToolExecutions to fetch.
     */
    orderBy?:
      | ToolExecutionOrderByWithRelationInput
      | ToolExecutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ToolExecutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ToolExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ToolExecutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ToolExecutions
     **/
    _count?: true | ToolExecutionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ToolExecutionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ToolExecutionMaxAggregateInputType;
  };

  export type GetToolExecutionAggregateType<
    T extends ToolExecutionAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateToolExecution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToolExecution[P]>
      : GetScalarType<T[P], AggregateToolExecution[P]>;
  };

  export type ToolExecutionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ToolExecutionWhereInput;
    orderBy?:
      | ToolExecutionOrderByWithAggregationInput
      | ToolExecutionOrderByWithAggregationInput[];
    by: ToolExecutionScalarFieldEnum[] | ToolExecutionScalarFieldEnum;
    having?: ToolExecutionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ToolExecutionCountAggregateInputType | true;
    _min?: ToolExecutionMinAggregateInputType;
    _max?: ToolExecutionMaxAggregateInputType;
  };

  export type ToolExecutionGroupByOutputType = {
    id: string;
    aiRunId: string;
    toolName: string;
    input: JsonValue;
    output: JsonValue | null;
    status: $Enums.ToolExecutionStatus;
    error: string | null;
    createdAt: Date;
    completedAt: Date | null;
    _count: ToolExecutionCountAggregateOutputType | null;
    _min: ToolExecutionMinAggregateOutputType | null;
    _max: ToolExecutionMaxAggregateOutputType | null;
  };

  type GetToolExecutionGroupByPayload<T extends ToolExecutionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ToolExecutionGroupByOutputType, T['by']> & {
          [
            P in keyof T & keyof ToolExecutionGroupByOutputType
          ]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToolExecutionGroupByOutputType[P]>
            : GetScalarType<T[P], ToolExecutionGroupByOutputType[P]>;
        }
      >
    >;

  export type ToolExecutionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      aiRunId?: boolean;
      toolName?: boolean;
      input?: boolean;
      output?: boolean;
      status?: boolean;
      error?: boolean;
      createdAt?: boolean;
      completedAt?: boolean;
      aiRun?: boolean | AiRunDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['toolExecution']
  >;

  export type ToolExecutionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      aiRunId?: boolean;
      toolName?: boolean;
      input?: boolean;
      output?: boolean;
      status?: boolean;
      error?: boolean;
      createdAt?: boolean;
      completedAt?: boolean;
      aiRun?: boolean | AiRunDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['toolExecution']
  >;

  export type ToolExecutionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      aiRunId?: boolean;
      toolName?: boolean;
      input?: boolean;
      output?: boolean;
      status?: boolean;
      error?: boolean;
      createdAt?: boolean;
      completedAt?: boolean;
      aiRun?: boolean | AiRunDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['toolExecution']
  >;

  export type ToolExecutionSelectScalar = {
    id?: boolean;
    aiRunId?: boolean;
    toolName?: boolean;
    input?: boolean;
    output?: boolean;
    status?: boolean;
    error?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
  };

  export type ToolExecutionOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'aiRunId'
    | 'toolName'
    | 'input'
    | 'output'
    | 'status'
    | 'error'
    | 'createdAt'
    | 'completedAt',
    ExtArgs['result']['toolExecution']
  >;
  export type ToolExecutionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    aiRun?: boolean | AiRunDefaultArgs<ExtArgs>;
  };
  export type ToolExecutionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    aiRun?: boolean | AiRunDefaultArgs<ExtArgs>;
  };
  export type ToolExecutionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    aiRun?: boolean | AiRunDefaultArgs<ExtArgs>;
  };

  export type $ToolExecutionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ToolExecution';
    objects: {
      aiRun: Prisma.$AiRunPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        aiRunId: string;
        toolName: string;
        input: Prisma.JsonValue;
        output: Prisma.JsonValue | null;
        status: $Enums.ToolExecutionStatus;
        error: string | null;
        createdAt: Date;
        completedAt: Date | null;
      },
      ExtArgs['result']['toolExecution']
    >;
    composites: {};
  };

  type ToolExecutionGetPayload<
    S extends boolean | null | undefined | ToolExecutionDefaultArgs,
  > = $Result.GetResult<Prisma.$ToolExecutionPayload, S>;

  type ToolExecutionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ToolExecutionFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ToolExecutionCountAggregateInputType | true;
  };

  export interface ToolExecutionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ToolExecution'];
      meta: { name: 'ToolExecution' };
    };
    /**
     * Find zero or one ToolExecution that matches the filter.
     * @param {ToolExecutionFindUniqueArgs} args - Arguments to find a ToolExecution
     * @example
     * // Get one ToolExecution
     * const toolExecution = await prisma.toolExecution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToolExecutionFindUniqueArgs>(
      args: SelectSubset<T, ToolExecutionFindUniqueArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ToolExecution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToolExecutionFindUniqueOrThrowArgs} args - Arguments to find a ToolExecution
     * @example
     * // Get one ToolExecution
     * const toolExecution = await prisma.toolExecution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToolExecutionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ToolExecutionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ToolExecution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolExecutionFindFirstArgs} args - Arguments to find a ToolExecution
     * @example
     * // Get one ToolExecution
     * const toolExecution = await prisma.toolExecution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToolExecutionFindFirstArgs>(
      args?: SelectSubset<T, ToolExecutionFindFirstArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ToolExecution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolExecutionFindFirstOrThrowArgs} args - Arguments to find a ToolExecution
     * @example
     * // Get one ToolExecution
     * const toolExecution = await prisma.toolExecution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToolExecutionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ToolExecutionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ToolExecutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolExecutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ToolExecutions
     * const toolExecutions = await prisma.toolExecution.findMany()
     *
     * // Get first 10 ToolExecutions
     * const toolExecutions = await prisma.toolExecution.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const toolExecutionWithIdOnly = await prisma.toolExecution.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ToolExecutionFindManyArgs>(
      args?: SelectSubset<T, ToolExecutionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ToolExecution.
     * @param {ToolExecutionCreateArgs} args - Arguments to create a ToolExecution.
     * @example
     * // Create one ToolExecution
     * const ToolExecution = await prisma.toolExecution.create({
     *   data: {
     *     // ... data to create a ToolExecution
     *   }
     * })
     *
     */
    create<T extends ToolExecutionCreateArgs>(
      args: SelectSubset<T, ToolExecutionCreateArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ToolExecutions.
     * @param {ToolExecutionCreateManyArgs} args - Arguments to create many ToolExecutions.
     * @example
     * // Create many ToolExecutions
     * const toolExecution = await prisma.toolExecution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ToolExecutionCreateManyArgs>(
      args?: SelectSubset<T, ToolExecutionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ToolExecutions and returns the data saved in the database.
     * @param {ToolExecutionCreateManyAndReturnArgs} args - Arguments to create many ToolExecutions.
     * @example
     * // Create many ToolExecutions
     * const toolExecution = await prisma.toolExecution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ToolExecutions and only return the `id`
     * const toolExecutionWithIdOnly = await prisma.toolExecution.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ToolExecutionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ToolExecutionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ToolExecution.
     * @param {ToolExecutionDeleteArgs} args - Arguments to delete one ToolExecution.
     * @example
     * // Delete one ToolExecution
     * const ToolExecution = await prisma.toolExecution.delete({
     *   where: {
     *     // ... filter to delete one ToolExecution
     *   }
     * })
     *
     */
    delete<T extends ToolExecutionDeleteArgs>(
      args: SelectSubset<T, ToolExecutionDeleteArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ToolExecution.
     * @param {ToolExecutionUpdateArgs} args - Arguments to update one ToolExecution.
     * @example
     * // Update one ToolExecution
     * const toolExecution = await prisma.toolExecution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ToolExecutionUpdateArgs>(
      args: SelectSubset<T, ToolExecutionUpdateArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ToolExecutions.
     * @param {ToolExecutionDeleteManyArgs} args - Arguments to filter ToolExecutions to delete.
     * @example
     * // Delete a few ToolExecutions
     * const { count } = await prisma.toolExecution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ToolExecutionDeleteManyArgs>(
      args?: SelectSubset<T, ToolExecutionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ToolExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolExecutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ToolExecutions
     * const toolExecution = await prisma.toolExecution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ToolExecutionUpdateManyArgs>(
      args: SelectSubset<T, ToolExecutionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ToolExecutions and returns the data updated in the database.
     * @param {ToolExecutionUpdateManyAndReturnArgs} args - Arguments to update many ToolExecutions.
     * @example
     * // Update many ToolExecutions
     * const toolExecution = await prisma.toolExecution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ToolExecutions and only return the `id`
     * const toolExecutionWithIdOnly = await prisma.toolExecution.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ToolExecutionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ToolExecutionUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ToolExecution.
     * @param {ToolExecutionUpsertArgs} args - Arguments to update or create a ToolExecution.
     * @example
     * // Update or create a ToolExecution
     * const toolExecution = await prisma.toolExecution.upsert({
     *   create: {
     *     // ... data to create a ToolExecution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ToolExecution we want to update
     *   }
     * })
     */
    upsert<T extends ToolExecutionUpsertArgs>(
      args: SelectSubset<T, ToolExecutionUpsertArgs<ExtArgs>>,
    ): Prisma__ToolExecutionClient<
      $Result.GetResult<
        Prisma.$ToolExecutionPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ToolExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolExecutionCountArgs} args - Arguments to filter ToolExecutions to count.
     * @example
     * // Count the number of ToolExecutions
     * const count = await prisma.toolExecution.count({
     *   where: {
     *     // ... the filter for the ToolExecutions we want to count
     *   }
     * })
     **/
    count<T extends ToolExecutionCountArgs>(
      args?: Subset<T, ToolExecutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToolExecutionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ToolExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolExecutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ToolExecutionAggregateArgs>(
      args: Subset<T, ToolExecutionAggregateArgs>,
    ): Prisma.PrismaPromise<GetToolExecutionAggregateType<T>>;

    /**
     * Group by ToolExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToolExecutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ToolExecutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: ToolExecutionGroupByArgs['orderBy'] }
        : { orderBy?: ToolExecutionGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, ToolExecutionGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetToolExecutionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ToolExecution model
     */
    readonly fields: ToolExecutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ToolExecution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToolExecutionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    aiRun<T extends AiRunDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, AiRunDefaultArgs<ExtArgs>>,
    ): Prisma__AiRunClient<
      | $Result.GetResult<
          Prisma.$AiRunPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ToolExecution model
   */
  interface ToolExecutionFieldRefs {
    readonly id: FieldRef<'ToolExecution', 'String'>;
    readonly aiRunId: FieldRef<'ToolExecution', 'String'>;
    readonly toolName: FieldRef<'ToolExecution', 'String'>;
    readonly input: FieldRef<'ToolExecution', 'Json'>;
    readonly output: FieldRef<'ToolExecution', 'Json'>;
    readonly status: FieldRef<'ToolExecution', 'ToolExecutionStatus'>;
    readonly error: FieldRef<'ToolExecution', 'String'>;
    readonly createdAt: FieldRef<'ToolExecution', 'DateTime'>;
    readonly completedAt: FieldRef<'ToolExecution', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * ToolExecution findUnique
   */
  export type ToolExecutionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * Filter, which ToolExecution to fetch.
     */
    where: ToolExecutionWhereUniqueInput;
  };

  /**
   * ToolExecution findUniqueOrThrow
   */
  export type ToolExecutionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * Filter, which ToolExecution to fetch.
     */
    where: ToolExecutionWhereUniqueInput;
  };

  /**
   * ToolExecution findFirst
   */
  export type ToolExecutionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * Filter, which ToolExecution to fetch.
     */
    where?: ToolExecutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ToolExecutions to fetch.
     */
    orderBy?:
      | ToolExecutionOrderByWithRelationInput
      | ToolExecutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ToolExecutions.
     */
    cursor?: ToolExecutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ToolExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ToolExecutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ToolExecutions.
     */
    distinct?: ToolExecutionScalarFieldEnum | ToolExecutionScalarFieldEnum[];
  };

  /**
   * ToolExecution findFirstOrThrow
   */
  export type ToolExecutionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * Filter, which ToolExecution to fetch.
     */
    where?: ToolExecutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ToolExecutions to fetch.
     */
    orderBy?:
      | ToolExecutionOrderByWithRelationInput
      | ToolExecutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ToolExecutions.
     */
    cursor?: ToolExecutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ToolExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ToolExecutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ToolExecutions.
     */
    distinct?: ToolExecutionScalarFieldEnum | ToolExecutionScalarFieldEnum[];
  };

  /**
   * ToolExecution findMany
   */
  export type ToolExecutionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * Filter, which ToolExecutions to fetch.
     */
    where?: ToolExecutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ToolExecutions to fetch.
     */
    orderBy?:
      | ToolExecutionOrderByWithRelationInput
      | ToolExecutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ToolExecutions.
     */
    cursor?: ToolExecutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ToolExecutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ToolExecutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ToolExecutions.
     */
    distinct?: ToolExecutionScalarFieldEnum | ToolExecutionScalarFieldEnum[];
  };

  /**
   * ToolExecution create
   */
  export type ToolExecutionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * The data needed to create a ToolExecution.
     */
    data: XOR<ToolExecutionCreateInput, ToolExecutionUncheckedCreateInput>;
  };

  /**
   * ToolExecution createMany
   */
  export type ToolExecutionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ToolExecutions.
     */
    data: ToolExecutionCreateManyInput | ToolExecutionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ToolExecution createManyAndReturn
   */
  export type ToolExecutionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * The data used to create many ToolExecutions.
     */
    data: ToolExecutionCreateManyInput | ToolExecutionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ToolExecution update
   */
  export type ToolExecutionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * The data needed to update a ToolExecution.
     */
    data: XOR<ToolExecutionUpdateInput, ToolExecutionUncheckedUpdateInput>;
    /**
     * Choose, which ToolExecution to update.
     */
    where: ToolExecutionWhereUniqueInput;
  };

  /**
   * ToolExecution updateMany
   */
  export type ToolExecutionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ToolExecutions.
     */
    data: XOR<
      ToolExecutionUpdateManyMutationInput,
      ToolExecutionUncheckedUpdateManyInput
    >;
    /**
     * Filter which ToolExecutions to update
     */
    where?: ToolExecutionWhereInput;
    /**
     * Limit how many ToolExecutions to update.
     */
    limit?: number;
  };

  /**
   * ToolExecution updateManyAndReturn
   */
  export type ToolExecutionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * The data used to update ToolExecutions.
     */
    data: XOR<
      ToolExecutionUpdateManyMutationInput,
      ToolExecutionUncheckedUpdateManyInput
    >;
    /**
     * Filter which ToolExecutions to update
     */
    where?: ToolExecutionWhereInput;
    /**
     * Limit how many ToolExecutions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ToolExecution upsert
   */
  export type ToolExecutionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * The filter to search for the ToolExecution to update in case it exists.
     */
    where: ToolExecutionWhereUniqueInput;
    /**
     * In case the ToolExecution found by the `where` argument doesn't exist, create a new ToolExecution with this data.
     */
    create: XOR<ToolExecutionCreateInput, ToolExecutionUncheckedCreateInput>;
    /**
     * In case the ToolExecution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToolExecutionUpdateInput, ToolExecutionUncheckedUpdateInput>;
  };

  /**
   * ToolExecution delete
   */
  export type ToolExecutionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
    /**
     * Filter which ToolExecution to delete.
     */
    where: ToolExecutionWhereUniqueInput;
  };

  /**
   * ToolExecution deleteMany
   */
  export type ToolExecutionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ToolExecutions to delete
     */
    where?: ToolExecutionWhereInput;
    /**
     * Limit how many ToolExecutions to delete.
     */
    limit?: number;
  };

  /**
   * ToolExecution without action
   */
  export type ToolExecutionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ToolExecution
     */
    select?: ToolExecutionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ToolExecution
     */
    omit?: ToolExecutionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToolExecutionInclude<ExtArgs> | null;
  };

  /**
   * Model Handoff
   */

  export type AggregateHandoff = {
    _count: HandoffCountAggregateOutputType | null;
    _min: HandoffMinAggregateOutputType | null;
    _max: HandoffMaxAggregateOutputType | null;
  };

  export type HandoffMinAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    status: $Enums.HandoffStatus | null;
    reason: string | null;
    assignedAgentId: string | null;
    requestedAt: Date | null;
    acceptedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type HandoffMaxAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    status: $Enums.HandoffStatus | null;
    reason: string | null;
    assignedAgentId: string | null;
    requestedAt: Date | null;
    acceptedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type HandoffCountAggregateOutputType = {
    id: number;
    conversationId: number;
    status: number;
    reason: number;
    assignedAgentId: number;
    requestedAt: number;
    acceptedAt: number;
    closedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type HandoffMinAggregateInputType = {
    id?: true;
    conversationId?: true;
    status?: true;
    reason?: true;
    assignedAgentId?: true;
    requestedAt?: true;
    acceptedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type HandoffMaxAggregateInputType = {
    id?: true;
    conversationId?: true;
    status?: true;
    reason?: true;
    assignedAgentId?: true;
    requestedAt?: true;
    acceptedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type HandoffCountAggregateInputType = {
    id?: true;
    conversationId?: true;
    status?: true;
    reason?: true;
    assignedAgentId?: true;
    requestedAt?: true;
    acceptedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type HandoffAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Handoff to aggregate.
     */
    where?: HandoffWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Handoffs to fetch.
     */
    orderBy?:
      HandoffOrderByWithRelationInput | HandoffOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: HandoffWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Handoffs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Handoffs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Handoffs
     **/
    _count?: true | HandoffCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: HandoffMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: HandoffMaxAggregateInputType;
  };

  export type GetHandoffAggregateType<T extends HandoffAggregateArgs> = {
    [P in keyof T & keyof AggregateHandoff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHandoff[P]>
      : GetScalarType<T[P], AggregateHandoff[P]>;
  };

  export type HandoffGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HandoffWhereInput;
    orderBy?:
      HandoffOrderByWithAggregationInput | HandoffOrderByWithAggregationInput[];
    by: HandoffScalarFieldEnum[] | HandoffScalarFieldEnum;
    having?: HandoffScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HandoffCountAggregateInputType | true;
    _min?: HandoffMinAggregateInputType;
    _max?: HandoffMaxAggregateInputType;
  };

  export type HandoffGroupByOutputType = {
    id: string;
    conversationId: string;
    status: $Enums.HandoffStatus;
    reason: string | null;
    assignedAgentId: string | null;
    requestedAt: Date;
    acceptedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: HandoffCountAggregateOutputType | null;
    _min: HandoffMinAggregateOutputType | null;
    _max: HandoffMaxAggregateOutputType | null;
  };

  type GetHandoffGroupByPayload<T extends HandoffGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<HandoffGroupByOutputType, T['by']> & {
          [P in keyof T & keyof HandoffGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HandoffGroupByOutputType[P]>
            : GetScalarType<T[P], HandoffGroupByOutputType[P]>;
        }
      >
    >;

  export type HandoffSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      status?: boolean;
      reason?: boolean;
      assignedAgentId?: boolean;
      requestedAt?: boolean;
      acceptedAt?: boolean;
      closedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['handoff']
  >;

  export type HandoffSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      status?: boolean;
      reason?: boolean;
      assignedAgentId?: boolean;
      requestedAt?: boolean;
      acceptedAt?: boolean;
      closedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['handoff']
  >;

  export type HandoffSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      conversationId?: boolean;
      status?: boolean;
      reason?: boolean;
      assignedAgentId?: boolean;
      requestedAt?: boolean;
      acceptedAt?: boolean;
      closedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['handoff']
  >;

  export type HandoffSelectScalar = {
    id?: boolean;
    conversationId?: boolean;
    status?: boolean;
    reason?: boolean;
    assignedAgentId?: boolean;
    requestedAt?: boolean;
    acceptedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type HandoffOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'conversationId'
    | 'status'
    | 'reason'
    | 'assignedAgentId'
    | 'requestedAt'
    | 'acceptedAt'
    | 'closedAt'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['handoff']
  >;
  export type HandoffInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };
  export type HandoffIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };
  export type HandoffIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>;
  };

  export type $HandoffPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Handoff';
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        conversationId: string;
        status: $Enums.HandoffStatus;
        reason: string | null;
        assignedAgentId: string | null;
        requestedAt: Date;
        acceptedAt: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['handoff']
    >;
    composites: {};
  };

  type HandoffGetPayload<
    S extends boolean | null | undefined | HandoffDefaultArgs,
  > = $Result.GetResult<Prisma.$HandoffPayload, S>;

  type HandoffCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<HandoffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HandoffCountAggregateInputType | true;
  };

  export interface HandoffDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Handoff'];
      meta: { name: 'Handoff' };
    };
    /**
     * Find zero or one Handoff that matches the filter.
     * @param {HandoffFindUniqueArgs} args - Arguments to find a Handoff
     * @example
     * // Get one Handoff
     * const handoff = await prisma.handoff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HandoffFindUniqueArgs>(
      args: SelectSubset<T, HandoffFindUniqueArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Handoff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HandoffFindUniqueOrThrowArgs} args - Arguments to find a Handoff
     * @example
     * // Get one Handoff
     * const handoff = await prisma.handoff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HandoffFindUniqueOrThrowArgs>(
      args: SelectSubset<T, HandoffFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Handoff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandoffFindFirstArgs} args - Arguments to find a Handoff
     * @example
     * // Get one Handoff
     * const handoff = await prisma.handoff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HandoffFindFirstArgs>(
      args?: SelectSubset<T, HandoffFindFirstArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Handoff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandoffFindFirstOrThrowArgs} args - Arguments to find a Handoff
     * @example
     * // Get one Handoff
     * const handoff = await prisma.handoff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HandoffFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HandoffFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Handoffs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandoffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Handoffs
     * const handoffs = await prisma.handoff.findMany()
     *
     * // Get first 10 Handoffs
     * const handoffs = await prisma.handoff.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const handoffWithIdOnly = await prisma.handoff.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HandoffFindManyArgs>(
      args?: SelectSubset<T, HandoffFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Handoff.
     * @param {HandoffCreateArgs} args - Arguments to create a Handoff.
     * @example
     * // Create one Handoff
     * const Handoff = await prisma.handoff.create({
     *   data: {
     *     // ... data to create a Handoff
     *   }
     * })
     *
     */
    create<T extends HandoffCreateArgs>(
      args: SelectSubset<T, HandoffCreateArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Handoffs.
     * @param {HandoffCreateManyArgs} args - Arguments to create many Handoffs.
     * @example
     * // Create many Handoffs
     * const handoff = await prisma.handoff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HandoffCreateManyArgs>(
      args?: SelectSubset<T, HandoffCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Handoffs and returns the data saved in the database.
     * @param {HandoffCreateManyAndReturnArgs} args - Arguments to create many Handoffs.
     * @example
     * // Create many Handoffs
     * const handoff = await prisma.handoff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Handoffs and only return the `id`
     * const handoffWithIdOnly = await prisma.handoff.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HandoffCreateManyAndReturnArgs>(
      args?: SelectSubset<T, HandoffCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Handoff.
     * @param {HandoffDeleteArgs} args - Arguments to delete one Handoff.
     * @example
     * // Delete one Handoff
     * const Handoff = await prisma.handoff.delete({
     *   where: {
     *     // ... filter to delete one Handoff
     *   }
     * })
     *
     */
    delete<T extends HandoffDeleteArgs>(
      args: SelectSubset<T, HandoffDeleteArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Handoff.
     * @param {HandoffUpdateArgs} args - Arguments to update one Handoff.
     * @example
     * // Update one Handoff
     * const handoff = await prisma.handoff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HandoffUpdateArgs>(
      args: SelectSubset<T, HandoffUpdateArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Handoffs.
     * @param {HandoffDeleteManyArgs} args - Arguments to filter Handoffs to delete.
     * @example
     * // Delete a few Handoffs
     * const { count } = await prisma.handoff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HandoffDeleteManyArgs>(
      args?: SelectSubset<T, HandoffDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Handoffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandoffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Handoffs
     * const handoff = await prisma.handoff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HandoffUpdateManyArgs>(
      args: SelectSubset<T, HandoffUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Handoffs and returns the data updated in the database.
     * @param {HandoffUpdateManyAndReturnArgs} args - Arguments to update many Handoffs.
     * @example
     * // Update many Handoffs
     * const handoff = await prisma.handoff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Handoffs and only return the `id`
     * const handoffWithIdOnly = await prisma.handoff.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends HandoffUpdateManyAndReturnArgs>(
      args: SelectSubset<T, HandoffUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Handoff.
     * @param {HandoffUpsertArgs} args - Arguments to update or create a Handoff.
     * @example
     * // Update or create a Handoff
     * const handoff = await prisma.handoff.upsert({
     *   create: {
     *     // ... data to create a Handoff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Handoff we want to update
     *   }
     * })
     */
    upsert<T extends HandoffUpsertArgs>(
      args: SelectSubset<T, HandoffUpsertArgs<ExtArgs>>,
    ): Prisma__HandoffClient<
      $Result.GetResult<
        Prisma.$HandoffPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Handoffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandoffCountArgs} args - Arguments to filter Handoffs to count.
     * @example
     * // Count the number of Handoffs
     * const count = await prisma.handoff.count({
     *   where: {
     *     // ... the filter for the Handoffs we want to count
     *   }
     * })
     **/
    count<T extends HandoffCountArgs>(
      args?: Subset<T, HandoffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HandoffCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Handoff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandoffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends HandoffAggregateArgs>(
      args: Subset<T, HandoffAggregateArgs>,
    ): Prisma.PrismaPromise<GetHandoffAggregateType<T>>;

    /**
     * Group by Handoff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandoffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends HandoffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: HandoffGroupByArgs['orderBy'] }
        : { orderBy?: HandoffGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, HandoffGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetHandoffGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Handoff model
     */
    readonly fields: HandoffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Handoff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HandoffClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ConversationDefaultArgs<ExtArgs>>,
    ): Prisma__ConversationClient<
      | $Result.GetResult<
          Prisma.$ConversationPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Handoff model
   */
  interface HandoffFieldRefs {
    readonly id: FieldRef<'Handoff', 'String'>;
    readonly conversationId: FieldRef<'Handoff', 'String'>;
    readonly status: FieldRef<'Handoff', 'HandoffStatus'>;
    readonly reason: FieldRef<'Handoff', 'String'>;
    readonly assignedAgentId: FieldRef<'Handoff', 'String'>;
    readonly requestedAt: FieldRef<'Handoff', 'DateTime'>;
    readonly acceptedAt: FieldRef<'Handoff', 'DateTime'>;
    readonly closedAt: FieldRef<'Handoff', 'DateTime'>;
    readonly createdAt: FieldRef<'Handoff', 'DateTime'>;
    readonly updatedAt: FieldRef<'Handoff', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Handoff findUnique
   */
  export type HandoffFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * Filter, which Handoff to fetch.
     */
    where: HandoffWhereUniqueInput;
  };

  /**
   * Handoff findUniqueOrThrow
   */
  export type HandoffFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * Filter, which Handoff to fetch.
     */
    where: HandoffWhereUniqueInput;
  };

  /**
   * Handoff findFirst
   */
  export type HandoffFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * Filter, which Handoff to fetch.
     */
    where?: HandoffWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Handoffs to fetch.
     */
    orderBy?:
      HandoffOrderByWithRelationInput | HandoffOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Handoffs.
     */
    cursor?: HandoffWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Handoffs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Handoffs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Handoffs.
     */
    distinct?: HandoffScalarFieldEnum | HandoffScalarFieldEnum[];
  };

  /**
   * Handoff findFirstOrThrow
   */
  export type HandoffFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * Filter, which Handoff to fetch.
     */
    where?: HandoffWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Handoffs to fetch.
     */
    orderBy?:
      HandoffOrderByWithRelationInput | HandoffOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Handoffs.
     */
    cursor?: HandoffWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Handoffs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Handoffs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Handoffs.
     */
    distinct?: HandoffScalarFieldEnum | HandoffScalarFieldEnum[];
  };

  /**
   * Handoff findMany
   */
  export type HandoffFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * Filter, which Handoffs to fetch.
     */
    where?: HandoffWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Handoffs to fetch.
     */
    orderBy?:
      HandoffOrderByWithRelationInput | HandoffOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Handoffs.
     */
    cursor?: HandoffWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Handoffs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Handoffs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Handoffs.
     */
    distinct?: HandoffScalarFieldEnum | HandoffScalarFieldEnum[];
  };

  /**
   * Handoff create
   */
  export type HandoffCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * The data needed to create a Handoff.
     */
    data: XOR<HandoffCreateInput, HandoffUncheckedCreateInput>;
  };

  /**
   * Handoff createMany
   */
  export type HandoffCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Handoffs.
     */
    data: HandoffCreateManyInput | HandoffCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Handoff createManyAndReturn
   */
  export type HandoffCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * The data used to create many Handoffs.
     */
    data: HandoffCreateManyInput | HandoffCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Handoff update
   */
  export type HandoffUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * The data needed to update a Handoff.
     */
    data: XOR<HandoffUpdateInput, HandoffUncheckedUpdateInput>;
    /**
     * Choose, which Handoff to update.
     */
    where: HandoffWhereUniqueInput;
  };

  /**
   * Handoff updateMany
   */
  export type HandoffUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Handoffs.
     */
    data: XOR<HandoffUpdateManyMutationInput, HandoffUncheckedUpdateManyInput>;
    /**
     * Filter which Handoffs to update
     */
    where?: HandoffWhereInput;
    /**
     * Limit how many Handoffs to update.
     */
    limit?: number;
  };

  /**
   * Handoff updateManyAndReturn
   */
  export type HandoffUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * The data used to update Handoffs.
     */
    data: XOR<HandoffUpdateManyMutationInput, HandoffUncheckedUpdateManyInput>;
    /**
     * Filter which Handoffs to update
     */
    where?: HandoffWhereInput;
    /**
     * Limit how many Handoffs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Handoff upsert
   */
  export type HandoffUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * The filter to search for the Handoff to update in case it exists.
     */
    where: HandoffWhereUniqueInput;
    /**
     * In case the Handoff found by the `where` argument doesn't exist, create a new Handoff with this data.
     */
    create: XOR<HandoffCreateInput, HandoffUncheckedCreateInput>;
    /**
     * In case the Handoff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HandoffUpdateInput, HandoffUncheckedUpdateInput>;
  };

  /**
   * Handoff delete
   */
  export type HandoffDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
    /**
     * Filter which Handoff to delete.
     */
    where: HandoffWhereUniqueInput;
  };

  /**
   * Handoff deleteMany
   */
  export type HandoffDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Handoffs to delete
     */
    where?: HandoffWhereInput;
    /**
     * Limit how many Handoffs to delete.
     */
    limit?: number;
  };

  /**
   * Handoff without action
   */
  export type HandoffDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Handoff
     */
    select?: HandoffSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Handoff
     */
    omit?: HandoffOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandoffInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const ContactScalarFieldEnum: {
    id: 'id';
    externalId: 'externalId';
    name: 'name';
    phoneNumber: 'phoneNumber';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ContactScalarFieldEnum =
    (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum];

  export const ConversationScalarFieldEnum: {
    id: 'id';
    contactId: 'contactId';
    status: 'status';
    locale: 'locale';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ConversationScalarFieldEnum =
    (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];

  export const MessageScalarFieldEnum: {
    id: 'id';
    conversationId: 'conversationId';
    direction: 'direction';
    type: 'type';
    providerMessageId: 'providerMessageId';
    text: 'text';
    status: 'status';
    metadata: 'metadata';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type MessageScalarFieldEnum =
    (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];

  export const WebhookEventScalarFieldEnum: {
    id: 'id';
    externalId: 'externalId';
    provider: 'provider';
    eventType: 'eventType';
    status: 'status';
    payload: 'payload';
    headers: 'headers';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type WebhookEventScalarFieldEnum =
    (typeof WebhookEventScalarFieldEnum)[keyof typeof WebhookEventScalarFieldEnum];

  export const AiRunScalarFieldEnum: {
    id: 'id';
    conversationId: 'conversationId';
    provider: 'provider';
    model: 'model';
    providerResponseId: 'providerResponseId';
    status: 'status';
    inputTokens: 'inputTokens';
    outputTokens: 'outputTokens';
    totalTokens: 'totalTokens';
    error: 'error';
    createdAt: 'createdAt';
    completedAt: 'completedAt';
  };

  export type AiRunScalarFieldEnum =
    (typeof AiRunScalarFieldEnum)[keyof typeof AiRunScalarFieldEnum];

  export const ToolExecutionScalarFieldEnum: {
    id: 'id';
    aiRunId: 'aiRunId';
    toolName: 'toolName';
    input: 'input';
    output: 'output';
    status: 'status';
    error: 'error';
    createdAt: 'createdAt';
    completedAt: 'completedAt';
  };

  export type ToolExecutionScalarFieldEnum =
    (typeof ToolExecutionScalarFieldEnum)[keyof typeof ToolExecutionScalarFieldEnum];

  export const HandoffScalarFieldEnum: {
    id: 'id';
    conversationId: 'conversationId';
    status: 'status';
    reason: 'reason';
    assignedAgentId: 'assignedAgentId';
    requestedAt: 'requestedAt';
    acceptedAt: 'acceptedAt';
    closedAt: 'closedAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type HandoffScalarFieldEnum =
    (typeof HandoffScalarFieldEnum)[keyof typeof HandoffScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'ConversationStatus'
   */
  export type EnumConversationStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ConversationStatus'>;

  /**
   * Reference to a field of type 'ConversationStatus[]'
   */
  export type ListEnumConversationStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ConversationStatus[]'>;

  /**
   * Reference to a field of type 'MessageDirection'
   */
  export type EnumMessageDirectionFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'MessageDirection'>;

  /**
   * Reference to a field of type 'MessageDirection[]'
   */
  export type ListEnumMessageDirectionFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'MessageDirection[]'>;

  /**
   * Reference to a field of type 'MessageType'
   */
  export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'MessageType'
  >;

  /**
   * Reference to a field of type 'MessageType[]'
   */
  export type ListEnumMessageTypeFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'MessageType[]'>;

  /**
   * Reference to a field of type 'MessageStatus'
   */
  export type EnumMessageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'MessageStatus'
  >;

  /**
   * Reference to a field of type 'MessageStatus[]'
   */
  export type ListEnumMessageStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'MessageStatus[]'>;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Json'
  >;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >;

  /**
   * Reference to a field of type 'WebhookStatus'
   */
  export type EnumWebhookStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'WebhookStatus'
  >;

  /**
   * Reference to a field of type 'WebhookStatus[]'
   */
  export type ListEnumWebhookStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'WebhookStatus[]'>;

  /**
   * Reference to a field of type 'AiRunStatus'
   */
  export type EnumAiRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AiRunStatus'
  >;

  /**
   * Reference to a field of type 'AiRunStatus[]'
   */
  export type ListEnumAiRunStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'AiRunStatus[]'>;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'ToolExecutionStatus'
   */
  export type EnumToolExecutionStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ToolExecutionStatus'>;

  /**
   * Reference to a field of type 'ToolExecutionStatus[]'
   */
  export type ListEnumToolExecutionStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ToolExecutionStatus[]'>;

  /**
   * Reference to a field of type 'HandoffStatus'
   */
  export type EnumHandoffStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'HandoffStatus'
  >;

  /**
   * Reference to a field of type 'HandoffStatus[]'
   */
  export type ListEnumHandoffStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'HandoffStatus[]'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[];
    OR?: ContactWhereInput[];
    NOT?: ContactWhereInput | ContactWhereInput[];
    id?: StringFilter<'Contact'> | string;
    externalId?: StringFilter<'Contact'> | string;
    name?: StringNullableFilter<'Contact'> | string | null;
    phoneNumber?: StringFilter<'Contact'> | string;
    createdAt?: DateTimeFilter<'Contact'> | Date | string;
    updatedAt?: DateTimeFilter<'Contact'> | Date | string;
    conversations?: ConversationListRelationFilter;
  };

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    name?: SortOrderInput | SortOrder;
    phoneNumber?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    conversations?: ConversationOrderByRelationAggregateInput;
  };

  export type ContactWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      externalId?: string;
      AND?: ContactWhereInput | ContactWhereInput[];
      OR?: ContactWhereInput[];
      NOT?: ContactWhereInput | ContactWhereInput[];
      name?: StringNullableFilter<'Contact'> | string | null;
      phoneNumber?: StringFilter<'Contact'> | string;
      createdAt?: DateTimeFilter<'Contact'> | Date | string;
      updatedAt?: DateTimeFilter<'Contact'> | Date | string;
      conversations?: ConversationListRelationFilter;
    },
    'id' | 'externalId'
  >;

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    name?: SortOrderInput | SortOrder;
    phoneNumber?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ContactCountOrderByAggregateInput;
    _max?: ContactMaxOrderByAggregateInput;
    _min?: ContactMinOrderByAggregateInput;
  };

  export type ContactScalarWhereWithAggregatesInput = {
    AND?:
      | ContactScalarWhereWithAggregatesInput
      | ContactScalarWhereWithAggregatesInput[];
    OR?: ContactScalarWhereWithAggregatesInput[];
    NOT?:
      | ContactScalarWhereWithAggregatesInput
      | ContactScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Contact'> | string;
    externalId?: StringWithAggregatesFilter<'Contact'> | string;
    name?: StringNullableWithAggregatesFilter<'Contact'> | string | null;
    phoneNumber?: StringWithAggregatesFilter<'Contact'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Contact'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Contact'> | Date | string;
  };

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[];
    OR?: ConversationWhereInput[];
    NOT?: ConversationWhereInput | ConversationWhereInput[];
    id?: StringFilter<'Conversation'> | string;
    contactId?: StringFilter<'Conversation'> | string;
    status?:
      EnumConversationStatusFilter<'Conversation'> | $Enums.ConversationStatus;
    locale?: StringFilter<'Conversation'> | string;
    createdAt?: DateTimeFilter<'Conversation'> | Date | string;
    updatedAt?: DateTimeFilter<'Conversation'> | Date | string;
    contact?: XOR<ContactScalarRelationFilter, ContactWhereInput>;
    messages?: MessageListRelationFilter;
    aiRuns?: AiRunListRelationFilter;
    handoffs?: HandoffListRelationFilter;
  };

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder;
    contactId?: SortOrder;
    status?: SortOrder;
    locale?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    contact?: ContactOrderByWithRelationInput;
    messages?: MessageOrderByRelationAggregateInput;
    aiRuns?: AiRunOrderByRelationAggregateInput;
    handoffs?: HandoffOrderByRelationAggregateInput;
  };

  export type ConversationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ConversationWhereInput | ConversationWhereInput[];
      OR?: ConversationWhereInput[];
      NOT?: ConversationWhereInput | ConversationWhereInput[];
      contactId?: StringFilter<'Conversation'> | string;
      status?:
        | EnumConversationStatusFilter<'Conversation'>
        | $Enums.ConversationStatus;
      locale?: StringFilter<'Conversation'> | string;
      createdAt?: DateTimeFilter<'Conversation'> | Date | string;
      updatedAt?: DateTimeFilter<'Conversation'> | Date | string;
      contact?: XOR<ContactScalarRelationFilter, ContactWhereInput>;
      messages?: MessageListRelationFilter;
      aiRuns?: AiRunListRelationFilter;
      handoffs?: HandoffListRelationFilter;
    },
    'id'
  >;

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder;
    contactId?: SortOrder;
    status?: SortOrder;
    locale?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ConversationCountOrderByAggregateInput;
    _max?: ConversationMaxOrderByAggregateInput;
    _min?: ConversationMinOrderByAggregateInput;
  };

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?:
      | ConversationScalarWhereWithAggregatesInput
      | ConversationScalarWhereWithAggregatesInput[];
    OR?: ConversationScalarWhereWithAggregatesInput[];
    NOT?:
      | ConversationScalarWhereWithAggregatesInput
      | ConversationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Conversation'> | string;
    contactId?: StringWithAggregatesFilter<'Conversation'> | string;
    status?:
      | EnumConversationStatusWithAggregatesFilter<'Conversation'>
      | $Enums.ConversationStatus;
    locale?: StringWithAggregatesFilter<'Conversation'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Conversation'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Conversation'> | Date | string;
  };

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[];
    OR?: MessageWhereInput[];
    NOT?: MessageWhereInput | MessageWhereInput[];
    id?: StringFilter<'Message'> | string;
    conversationId?: StringFilter<'Message'> | string;
    direction?: EnumMessageDirectionFilter<'Message'> | $Enums.MessageDirection;
    type?: EnumMessageTypeFilter<'Message'> | $Enums.MessageType;
    providerMessageId?: StringNullableFilter<'Message'> | string | null;
    text?: StringNullableFilter<'Message'> | string | null;
    status?: EnumMessageStatusFilter<'Message'> | $Enums.MessageStatus;
    metadata?: JsonFilter<'Message'>;
    createdAt?: DateTimeFilter<'Message'> | Date | string;
    updatedAt?: DateTimeFilter<'Message'> | Date | string;
    conversation?: XOR<
      ConversationScalarRelationFilter,
      ConversationWhereInput
    >;
  };

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    direction?: SortOrder;
    type?: SortOrder;
    providerMessageId?: SortOrderInput | SortOrder;
    text?: SortOrderInput | SortOrder;
    status?: SortOrder;
    metadata?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    conversation?: ConversationOrderByWithRelationInput;
  };

  export type MessageWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: MessageWhereInput | MessageWhereInput[];
      OR?: MessageWhereInput[];
      NOT?: MessageWhereInput | MessageWhereInput[];
      conversationId?: StringFilter<'Message'> | string;
      direction?:
        EnumMessageDirectionFilter<'Message'> | $Enums.MessageDirection;
      type?: EnumMessageTypeFilter<'Message'> | $Enums.MessageType;
      providerMessageId?: StringNullableFilter<'Message'> | string | null;
      text?: StringNullableFilter<'Message'> | string | null;
      status?: EnumMessageStatusFilter<'Message'> | $Enums.MessageStatus;
      metadata?: JsonFilter<'Message'>;
      createdAt?: DateTimeFilter<'Message'> | Date | string;
      updatedAt?: DateTimeFilter<'Message'> | Date | string;
      conversation?: XOR<
        ConversationScalarRelationFilter,
        ConversationWhereInput
      >;
    },
    'id'
  >;

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    direction?: SortOrder;
    type?: SortOrder;
    providerMessageId?: SortOrderInput | SortOrder;
    text?: SortOrderInput | SortOrder;
    status?: SortOrder;
    metadata?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: MessageCountOrderByAggregateInput;
    _max?: MessageMaxOrderByAggregateInput;
    _min?: MessageMinOrderByAggregateInput;
  };

  export type MessageScalarWhereWithAggregatesInput = {
    AND?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    OR?: MessageScalarWhereWithAggregatesInput[];
    NOT?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Message'> | string;
    conversationId?: StringWithAggregatesFilter<'Message'> | string;
    direction?:
      | EnumMessageDirectionWithAggregatesFilter<'Message'>
      | $Enums.MessageDirection;
    type?: EnumMessageTypeWithAggregatesFilter<'Message'> | $Enums.MessageType;
    providerMessageId?:
      StringNullableWithAggregatesFilter<'Message'> | string | null;
    text?: StringNullableWithAggregatesFilter<'Message'> | string | null;
    status?:
      EnumMessageStatusWithAggregatesFilter<'Message'> | $Enums.MessageStatus;
    metadata?: JsonWithAggregatesFilter<'Message'>;
    createdAt?: DateTimeWithAggregatesFilter<'Message'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Message'> | Date | string;
  };

  export type WebhookEventWhereInput = {
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[];
    OR?: WebhookEventWhereInput[];
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[];
    id?: StringFilter<'WebhookEvent'> | string;
    externalId?: StringFilter<'WebhookEvent'> | string;
    provider?: StringFilter<'WebhookEvent'> | string;
    eventType?: StringFilter<'WebhookEvent'> | string;
    status?: EnumWebhookStatusFilter<'WebhookEvent'> | $Enums.WebhookStatus;
    payload?: JsonFilter<'WebhookEvent'>;
    headers?: JsonFilter<'WebhookEvent'>;
    createdAt?: DateTimeFilter<'WebhookEvent'> | Date | string;
    updatedAt?: DateTimeFilter<'WebhookEvent'> | Date | string;
  };

  export type WebhookEventOrderByWithRelationInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    provider?: SortOrder;
    eventType?: SortOrder;
    status?: SortOrder;
    payload?: SortOrder;
    headers?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WebhookEventWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      externalId?: string;
      AND?: WebhookEventWhereInput | WebhookEventWhereInput[];
      OR?: WebhookEventWhereInput[];
      NOT?: WebhookEventWhereInput | WebhookEventWhereInput[];
      provider?: StringFilter<'WebhookEvent'> | string;
      eventType?: StringFilter<'WebhookEvent'> | string;
      status?: EnumWebhookStatusFilter<'WebhookEvent'> | $Enums.WebhookStatus;
      payload?: JsonFilter<'WebhookEvent'>;
      headers?: JsonFilter<'WebhookEvent'>;
      createdAt?: DateTimeFilter<'WebhookEvent'> | Date | string;
      updatedAt?: DateTimeFilter<'WebhookEvent'> | Date | string;
    },
    'id' | 'externalId'
  >;

  export type WebhookEventOrderByWithAggregationInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    provider?: SortOrder;
    eventType?: SortOrder;
    status?: SortOrder;
    payload?: SortOrder;
    headers?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: WebhookEventCountOrderByAggregateInput;
    _max?: WebhookEventMaxOrderByAggregateInput;
    _min?: WebhookEventMinOrderByAggregateInput;
  };

  export type WebhookEventScalarWhereWithAggregatesInput = {
    AND?:
      | WebhookEventScalarWhereWithAggregatesInput
      | WebhookEventScalarWhereWithAggregatesInput[];
    OR?: WebhookEventScalarWhereWithAggregatesInput[];
    NOT?:
      | WebhookEventScalarWhereWithAggregatesInput
      | WebhookEventScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'WebhookEvent'> | string;
    externalId?: StringWithAggregatesFilter<'WebhookEvent'> | string;
    provider?: StringWithAggregatesFilter<'WebhookEvent'> | string;
    eventType?: StringWithAggregatesFilter<'WebhookEvent'> | string;
    status?:
      | EnumWebhookStatusWithAggregatesFilter<'WebhookEvent'>
      | $Enums.WebhookStatus;
    payload?: JsonWithAggregatesFilter<'WebhookEvent'>;
    headers?: JsonWithAggregatesFilter<'WebhookEvent'>;
    createdAt?: DateTimeWithAggregatesFilter<'WebhookEvent'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'WebhookEvent'> | Date | string;
  };

  export type AiRunWhereInput = {
    AND?: AiRunWhereInput | AiRunWhereInput[];
    OR?: AiRunWhereInput[];
    NOT?: AiRunWhereInput | AiRunWhereInput[];
    id?: StringFilter<'AiRun'> | string;
    conversationId?: StringFilter<'AiRun'> | string;
    provider?: StringFilter<'AiRun'> | string;
    model?: StringFilter<'AiRun'> | string;
    providerResponseId?: StringNullableFilter<'AiRun'> | string | null;
    status?: EnumAiRunStatusFilter<'AiRun'> | $Enums.AiRunStatus;
    inputTokens?: IntNullableFilter<'AiRun'> | number | null;
    outputTokens?: IntNullableFilter<'AiRun'> | number | null;
    totalTokens?: IntNullableFilter<'AiRun'> | number | null;
    error?: StringNullableFilter<'AiRun'> | string | null;
    createdAt?: DateTimeFilter<'AiRun'> | Date | string;
    completedAt?: DateTimeNullableFilter<'AiRun'> | Date | string | null;
    conversation?: XOR<
      ConversationScalarRelationFilter,
      ConversationWhereInput
    >;
    toolExecutions?: ToolExecutionListRelationFilter;
  };

  export type AiRunOrderByWithRelationInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    provider?: SortOrder;
    model?: SortOrder;
    providerResponseId?: SortOrderInput | SortOrder;
    status?: SortOrder;
    inputTokens?: SortOrderInput | SortOrder;
    outputTokens?: SortOrderInput | SortOrder;
    totalTokens?: SortOrderInput | SortOrder;
    error?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrderInput | SortOrder;
    conversation?: ConversationOrderByWithRelationInput;
    toolExecutions?: ToolExecutionOrderByRelationAggregateInput;
  };

  export type AiRunWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AiRunWhereInput | AiRunWhereInput[];
      OR?: AiRunWhereInput[];
      NOT?: AiRunWhereInput | AiRunWhereInput[];
      conversationId?: StringFilter<'AiRun'> | string;
      provider?: StringFilter<'AiRun'> | string;
      model?: StringFilter<'AiRun'> | string;
      providerResponseId?: StringNullableFilter<'AiRun'> | string | null;
      status?: EnumAiRunStatusFilter<'AiRun'> | $Enums.AiRunStatus;
      inputTokens?: IntNullableFilter<'AiRun'> | number | null;
      outputTokens?: IntNullableFilter<'AiRun'> | number | null;
      totalTokens?: IntNullableFilter<'AiRun'> | number | null;
      error?: StringNullableFilter<'AiRun'> | string | null;
      createdAt?: DateTimeFilter<'AiRun'> | Date | string;
      completedAt?: DateTimeNullableFilter<'AiRun'> | Date | string | null;
      conversation?: XOR<
        ConversationScalarRelationFilter,
        ConversationWhereInput
      >;
      toolExecutions?: ToolExecutionListRelationFilter;
    },
    'id'
  >;

  export type AiRunOrderByWithAggregationInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    provider?: SortOrder;
    model?: SortOrder;
    providerResponseId?: SortOrderInput | SortOrder;
    status?: SortOrder;
    inputTokens?: SortOrderInput | SortOrder;
    outputTokens?: SortOrderInput | SortOrder;
    totalTokens?: SortOrderInput | SortOrder;
    error?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrderInput | SortOrder;
    _count?: AiRunCountOrderByAggregateInput;
    _avg?: AiRunAvgOrderByAggregateInput;
    _max?: AiRunMaxOrderByAggregateInput;
    _min?: AiRunMinOrderByAggregateInput;
    _sum?: AiRunSumOrderByAggregateInput;
  };

  export type AiRunScalarWhereWithAggregatesInput = {
    AND?:
      | AiRunScalarWhereWithAggregatesInput
      | AiRunScalarWhereWithAggregatesInput[];
    OR?: AiRunScalarWhereWithAggregatesInput[];
    NOT?:
      | AiRunScalarWhereWithAggregatesInput
      | AiRunScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'AiRun'> | string;
    conversationId?: StringWithAggregatesFilter<'AiRun'> | string;
    provider?: StringWithAggregatesFilter<'AiRun'> | string;
    model?: StringWithAggregatesFilter<'AiRun'> | string;
    providerResponseId?:
      StringNullableWithAggregatesFilter<'AiRun'> | string | null;
    status?: EnumAiRunStatusWithAggregatesFilter<'AiRun'> | $Enums.AiRunStatus;
    inputTokens?: IntNullableWithAggregatesFilter<'AiRun'> | number | null;
    outputTokens?: IntNullableWithAggregatesFilter<'AiRun'> | number | null;
    totalTokens?: IntNullableWithAggregatesFilter<'AiRun'> | number | null;
    error?: StringNullableWithAggregatesFilter<'AiRun'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'AiRun'> | Date | string;
    completedAt?:
      DateTimeNullableWithAggregatesFilter<'AiRun'> | Date | string | null;
  };

  export type ToolExecutionWhereInput = {
    AND?: ToolExecutionWhereInput | ToolExecutionWhereInput[];
    OR?: ToolExecutionWhereInput[];
    NOT?: ToolExecutionWhereInput | ToolExecutionWhereInput[];
    id?: StringFilter<'ToolExecution'> | string;
    aiRunId?: StringFilter<'ToolExecution'> | string;
    toolName?: StringFilter<'ToolExecution'> | string;
    input?: JsonFilter<'ToolExecution'>;
    output?: JsonNullableFilter<'ToolExecution'>;
    status?:
      | EnumToolExecutionStatusFilter<'ToolExecution'>
      | $Enums.ToolExecutionStatus;
    error?: StringNullableFilter<'ToolExecution'> | string | null;
    createdAt?: DateTimeFilter<'ToolExecution'> | Date | string;
    completedAt?:
      DateTimeNullableFilter<'ToolExecution'> | Date | string | null;
    aiRun?: XOR<AiRunScalarRelationFilter, AiRunWhereInput>;
  };

  export type ToolExecutionOrderByWithRelationInput = {
    id?: SortOrder;
    aiRunId?: SortOrder;
    toolName?: SortOrder;
    input?: SortOrder;
    output?: SortOrderInput | SortOrder;
    status?: SortOrder;
    error?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrderInput | SortOrder;
    aiRun?: AiRunOrderByWithRelationInput;
  };

  export type ToolExecutionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ToolExecutionWhereInput | ToolExecutionWhereInput[];
      OR?: ToolExecutionWhereInput[];
      NOT?: ToolExecutionWhereInput | ToolExecutionWhereInput[];
      aiRunId?: StringFilter<'ToolExecution'> | string;
      toolName?: StringFilter<'ToolExecution'> | string;
      input?: JsonFilter<'ToolExecution'>;
      output?: JsonNullableFilter<'ToolExecution'>;
      status?:
        | EnumToolExecutionStatusFilter<'ToolExecution'>
        | $Enums.ToolExecutionStatus;
      error?: StringNullableFilter<'ToolExecution'> | string | null;
      createdAt?: DateTimeFilter<'ToolExecution'> | Date | string;
      completedAt?:
        DateTimeNullableFilter<'ToolExecution'> | Date | string | null;
      aiRun?: XOR<AiRunScalarRelationFilter, AiRunWhereInput>;
    },
    'id'
  >;

  export type ToolExecutionOrderByWithAggregationInput = {
    id?: SortOrder;
    aiRunId?: SortOrder;
    toolName?: SortOrder;
    input?: SortOrder;
    output?: SortOrderInput | SortOrder;
    status?: SortOrder;
    error?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrderInput | SortOrder;
    _count?: ToolExecutionCountOrderByAggregateInput;
    _max?: ToolExecutionMaxOrderByAggregateInput;
    _min?: ToolExecutionMinOrderByAggregateInput;
  };

  export type ToolExecutionScalarWhereWithAggregatesInput = {
    AND?:
      | ToolExecutionScalarWhereWithAggregatesInput
      | ToolExecutionScalarWhereWithAggregatesInput[];
    OR?: ToolExecutionScalarWhereWithAggregatesInput[];
    NOT?:
      | ToolExecutionScalarWhereWithAggregatesInput
      | ToolExecutionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'ToolExecution'> | string;
    aiRunId?: StringWithAggregatesFilter<'ToolExecution'> | string;
    toolName?: StringWithAggregatesFilter<'ToolExecution'> | string;
    input?: JsonWithAggregatesFilter<'ToolExecution'>;
    output?: JsonNullableWithAggregatesFilter<'ToolExecution'>;
    status?:
      | EnumToolExecutionStatusWithAggregatesFilter<'ToolExecution'>
      | $Enums.ToolExecutionStatus;
    error?: StringNullableWithAggregatesFilter<'ToolExecution'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'ToolExecution'> | Date | string;
    completedAt?:
      | DateTimeNullableWithAggregatesFilter<'ToolExecution'>
      | Date
      | string
      | null;
  };

  export type HandoffWhereInput = {
    AND?: HandoffWhereInput | HandoffWhereInput[];
    OR?: HandoffWhereInput[];
    NOT?: HandoffWhereInput | HandoffWhereInput[];
    id?: StringFilter<'Handoff'> | string;
    conversationId?: StringFilter<'Handoff'> | string;
    status?: EnumHandoffStatusFilter<'Handoff'> | $Enums.HandoffStatus;
    reason?: StringNullableFilter<'Handoff'> | string | null;
    assignedAgentId?: StringNullableFilter<'Handoff'> | string | null;
    requestedAt?: DateTimeFilter<'Handoff'> | Date | string;
    acceptedAt?: DateTimeNullableFilter<'Handoff'> | Date | string | null;
    closedAt?: DateTimeNullableFilter<'Handoff'> | Date | string | null;
    createdAt?: DateTimeFilter<'Handoff'> | Date | string;
    updatedAt?: DateTimeFilter<'Handoff'> | Date | string;
    conversation?: XOR<
      ConversationScalarRelationFilter,
      ConversationWhereInput
    >;
  };

  export type HandoffOrderByWithRelationInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    status?: SortOrder;
    reason?: SortOrderInput | SortOrder;
    assignedAgentId?: SortOrderInput | SortOrder;
    requestedAt?: SortOrder;
    acceptedAt?: SortOrderInput | SortOrder;
    closedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    conversation?: ConversationOrderByWithRelationInput;
  };

  export type HandoffWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: HandoffWhereInput | HandoffWhereInput[];
      OR?: HandoffWhereInput[];
      NOT?: HandoffWhereInput | HandoffWhereInput[];
      conversationId?: StringFilter<'Handoff'> | string;
      status?: EnumHandoffStatusFilter<'Handoff'> | $Enums.HandoffStatus;
      reason?: StringNullableFilter<'Handoff'> | string | null;
      assignedAgentId?: StringNullableFilter<'Handoff'> | string | null;
      requestedAt?: DateTimeFilter<'Handoff'> | Date | string;
      acceptedAt?: DateTimeNullableFilter<'Handoff'> | Date | string | null;
      closedAt?: DateTimeNullableFilter<'Handoff'> | Date | string | null;
      createdAt?: DateTimeFilter<'Handoff'> | Date | string;
      updatedAt?: DateTimeFilter<'Handoff'> | Date | string;
      conversation?: XOR<
        ConversationScalarRelationFilter,
        ConversationWhereInput
      >;
    },
    'id'
  >;

  export type HandoffOrderByWithAggregationInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    status?: SortOrder;
    reason?: SortOrderInput | SortOrder;
    assignedAgentId?: SortOrderInput | SortOrder;
    requestedAt?: SortOrder;
    acceptedAt?: SortOrderInput | SortOrder;
    closedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: HandoffCountOrderByAggregateInput;
    _max?: HandoffMaxOrderByAggregateInput;
    _min?: HandoffMinOrderByAggregateInput;
  };

  export type HandoffScalarWhereWithAggregatesInput = {
    AND?:
      | HandoffScalarWhereWithAggregatesInput
      | HandoffScalarWhereWithAggregatesInput[];
    OR?: HandoffScalarWhereWithAggregatesInput[];
    NOT?:
      | HandoffScalarWhereWithAggregatesInput
      | HandoffScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Handoff'> | string;
    conversationId?: StringWithAggregatesFilter<'Handoff'> | string;
    status?:
      EnumHandoffStatusWithAggregatesFilter<'Handoff'> | $Enums.HandoffStatus;
    reason?: StringNullableWithAggregatesFilter<'Handoff'> | string | null;
    assignedAgentId?:
      StringNullableWithAggregatesFilter<'Handoff'> | string | null;
    requestedAt?: DateTimeWithAggregatesFilter<'Handoff'> | Date | string;
    acceptedAt?:
      DateTimeNullableWithAggregatesFilter<'Handoff'> | Date | string | null;
    closedAt?:
      DateTimeNullableWithAggregatesFilter<'Handoff'> | Date | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Handoff'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Handoff'> | Date | string;
  };

  export type ContactCreateInput = {
    id?: string;
    externalId: string;
    name?: string | null;
    phoneNumber: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    conversations?: ConversationCreateNestedManyWithoutContactInput;
  };

  export type ContactUncheckedCreateInput = {
    id?: string;
    externalId: string;
    name?: string | null;
    phoneNumber: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    conversations?: ConversationUncheckedCreateNestedManyWithoutContactInput;
  };

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    conversations?: ConversationUpdateManyWithoutContactNestedInput;
  };

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    conversations?: ConversationUncheckedUpdateManyWithoutContactNestedInput;
  };

  export type ContactCreateManyInput = {
    id?: string;
    externalId: string;
    name?: string | null;
    phoneNumber: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ConversationCreateInput = {
    id?: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contact: ContactCreateNestedOneWithoutConversationsInput;
    messages?: MessageCreateNestedManyWithoutConversationInput;
    aiRuns?: AiRunCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffCreateNestedManyWithoutConversationInput;
  };

  export type ConversationUncheckedCreateInput = {
    id?: string;
    contactId: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput;
    aiRuns?: AiRunUncheckedCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffUncheckedCreateNestedManyWithoutConversationInput;
  };

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    contact?: ContactUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: MessageUpdateManyWithoutConversationNestedInput;
    aiRuns?: AiRunUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    contactId?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput;
    aiRuns?: AiRunUncheckedUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUncheckedUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationCreateManyInput = {
    id?: string;
    contactId: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    contactId?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageCreateInput = {
    id?: string;
    direction: $Enums.MessageDirection;
    type: $Enums.MessageType;
    providerMessageId?: string | null;
    text?: string | null;
    status: $Enums.MessageStatus;
    metadata: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    conversation: ConversationCreateNestedOneWithoutMessagesInput;
  };

  export type MessageUncheckedCreateInput = {
    id?: string;
    conversationId: string;
    direction: $Enums.MessageDirection;
    type: $Enums.MessageType;
    providerMessageId?: string | null;
    text?: string | null;
    status: $Enums.MessageStatus;
    metadata: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    direction?:
      EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection;
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    providerMessageId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    text?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    metadata?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput;
  };

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    conversationId?: StringFieldUpdateOperationsInput | string;
    direction?:
      EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection;
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    providerMessageId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    text?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    metadata?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageCreateManyInput = {
    id?: string;
    conversationId: string;
    direction: $Enums.MessageDirection;
    type: $Enums.MessageType;
    providerMessageId?: string | null;
    text?: string | null;
    status: $Enums.MessageStatus;
    metadata: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    direction?:
      EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection;
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    providerMessageId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    text?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    metadata?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    conversationId?: StringFieldUpdateOperationsInput | string;
    direction?:
      EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection;
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    providerMessageId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    text?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    metadata?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookEventCreateInput = {
    id?: string;
    externalId: string;
    provider: string;
    eventType: string;
    status: $Enums.WebhookStatus;
    payload: JsonNullValueInput | InputJsonValue;
    headers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WebhookEventUncheckedCreateInput = {
    id?: string;
    externalId: string;
    provider: string;
    eventType: string;
    status: $Enums.WebhookStatus;
    payload: JsonNullValueInput | InputJsonValue;
    headers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WebhookEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    eventType?: StringFieldUpdateOperationsInput | string;
    status?: EnumWebhookStatusFieldUpdateOperationsInput | $Enums.WebhookStatus;
    payload?: JsonNullValueInput | InputJsonValue;
    headers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    eventType?: StringFieldUpdateOperationsInput | string;
    status?: EnumWebhookStatusFieldUpdateOperationsInput | $Enums.WebhookStatus;
    payload?: JsonNullValueInput | InputJsonValue;
    headers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookEventCreateManyInput = {
    id?: string;
    externalId: string;
    provider: string;
    eventType: string;
    status: $Enums.WebhookStatus;
    payload: JsonNullValueInput | InputJsonValue;
    headers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WebhookEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    eventType?: StringFieldUpdateOperationsInput | string;
    status?: EnumWebhookStatusFieldUpdateOperationsInput | $Enums.WebhookStatus;
    payload?: JsonNullValueInput | InputJsonValue;
    headers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WebhookEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    eventType?: StringFieldUpdateOperationsInput | string;
    status?: EnumWebhookStatusFieldUpdateOperationsInput | $Enums.WebhookStatus;
    payload?: JsonNullValueInput | InputJsonValue;
    headers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AiRunCreateInput = {
    id?: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    conversation: ConversationCreateNestedOneWithoutAiRunsInput;
    toolExecutions?: ToolExecutionCreateNestedManyWithoutAiRunInput;
  };

  export type AiRunUncheckedCreateInput = {
    id?: string;
    conversationId: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    toolExecutions?: ToolExecutionUncheckedCreateNestedManyWithoutAiRunInput;
  };

  export type AiRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    conversation?: ConversationUpdateOneRequiredWithoutAiRunsNestedInput;
    toolExecutions?: ToolExecutionUpdateManyWithoutAiRunNestedInput;
  };

  export type AiRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    conversationId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    toolExecutions?: ToolExecutionUncheckedUpdateManyWithoutAiRunNestedInput;
  };

  export type AiRunCreateManyInput = {
    id?: string;
    conversationId: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type AiRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type AiRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    conversationId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ToolExecutionCreateInput = {
    id?: string;
    toolName: string;
    input: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status: $Enums.ToolExecutionStatus;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    aiRun: AiRunCreateNestedOneWithoutToolExecutionsInput;
  };

  export type ToolExecutionUncheckedCreateInput = {
    id?: string;
    aiRunId: string;
    toolName: string;
    input: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status: $Enums.ToolExecutionStatus;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type ToolExecutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    toolName?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status?:
      | EnumToolExecutionStatusFieldUpdateOperationsInput
      | $Enums.ToolExecutionStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    aiRun?: AiRunUpdateOneRequiredWithoutToolExecutionsNestedInput;
  };

  export type ToolExecutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    aiRunId?: StringFieldUpdateOperationsInput | string;
    toolName?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status?:
      | EnumToolExecutionStatusFieldUpdateOperationsInput
      | $Enums.ToolExecutionStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ToolExecutionCreateManyInput = {
    id?: string;
    aiRunId: string;
    toolName: string;
    input: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status: $Enums.ToolExecutionStatus;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type ToolExecutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    toolName?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status?:
      | EnumToolExecutionStatusFieldUpdateOperationsInput
      | $Enums.ToolExecutionStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ToolExecutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    aiRunId?: StringFieldUpdateOperationsInput | string;
    toolName?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status?:
      | EnumToolExecutionStatusFieldUpdateOperationsInput
      | $Enums.ToolExecutionStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type HandoffCreateInput = {
    id?: string;
    status: $Enums.HandoffStatus;
    reason?: string | null;
    assignedAgentId?: string | null;
    requestedAt: Date | string;
    acceptedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    conversation: ConversationCreateNestedOneWithoutHandoffsInput;
  };

  export type HandoffUncheckedCreateInput = {
    id?: string;
    conversationId: string;
    status: $Enums.HandoffStatus;
    reason?: string | null;
    assignedAgentId?: string | null;
    requestedAt: Date | string;
    acceptedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HandoffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumHandoffStatusFieldUpdateOperationsInput | $Enums.HandoffStatus;
    reason?: NullableStringFieldUpdateOperationsInput | string | null;
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null;
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    acceptedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: ConversationUpdateOneRequiredWithoutHandoffsNestedInput;
  };

  export type HandoffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    conversationId?: StringFieldUpdateOperationsInput | string;
    status?: EnumHandoffStatusFieldUpdateOperationsInput | $Enums.HandoffStatus;
    reason?: NullableStringFieldUpdateOperationsInput | string | null;
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null;
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    acceptedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HandoffCreateManyInput = {
    id?: string;
    conversationId: string;
    status: $Enums.HandoffStatus;
    reason?: string | null;
    assignedAgentId?: string | null;
    requestedAt: Date | string;
    acceptedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HandoffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumHandoffStatusFieldUpdateOperationsInput | $Enums.HandoffStatus;
    reason?: NullableStringFieldUpdateOperationsInput | string | null;
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null;
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    acceptedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HandoffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    conversationId?: StringFieldUpdateOperationsInput | string;
    status?: EnumHandoffStatusFieldUpdateOperationsInput | $Enums.HandoffStatus;
    reason?: NullableStringFieldUpdateOperationsInput | string | null;
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null;
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    acceptedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput;
    some?: ConversationWhereInput;
    none?: ConversationWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    name?: SortOrder;
    phoneNumber?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    name?: SortOrder;
    phoneNumber?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    name?: SortOrder;
    phoneNumber?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type EnumConversationStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ConversationStatus
      | EnumConversationStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ConversationStatus[]
      | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ConversationStatus[]
      | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumConversationStatusFilter<$PrismaModel>
      | $Enums.ConversationStatus;
  };

  export type ContactScalarRelationFilter = {
    is?: ContactWhereInput;
    isNot?: ContactWhereInput;
  };

  export type MessageListRelationFilter = {
    every?: MessageWhereInput;
    some?: MessageWhereInput;
    none?: MessageWhereInput;
  };

  export type AiRunListRelationFilter = {
    every?: AiRunWhereInput;
    some?: AiRunWhereInput;
    none?: AiRunWhereInput;
  };

  export type HandoffListRelationFilter = {
    every?: HandoffWhereInput;
    some?: HandoffWhereInput;
    none?: HandoffWhereInput;
  };

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AiRunOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type HandoffOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder;
    contactId?: SortOrder;
    status?: SortOrder;
    locale?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder;
    contactId?: SortOrder;
    status?: SortOrder;
    locale?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder;
    contactId?: SortOrder;
    status?: SortOrder;
    locale?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumConversationStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.ConversationStatus
        | EnumConversationStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.ConversationStatus[]
        | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.ConversationStatus[]
        | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.ConversationStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumConversationStatusFilter<$PrismaModel>;
      _max?: NestedEnumConversationStatusFilter<$PrismaModel>;
    };

  export type EnumMessageDirectionFilter<$PrismaModel = never> = {
    equals?:
      $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    not?:
      NestedEnumMessageDirectionFilter<$PrismaModel> | $Enums.MessageDirection;
  };

  export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType;
  };

  export type EnumMessageStatusFilter<$PrismaModel = never> = {
    equals?:
      $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput;
    isNot?: ConversationWhereInput;
  };

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    direction?: SortOrder;
    type?: SortOrder;
    providerMessageId?: SortOrder;
    text?: SortOrder;
    status?: SortOrder;
    metadata?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    direction?: SortOrder;
    type?: SortOrder;
    providerMessageId?: SortOrder;
    text?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    direction?: SortOrder;
    type?: SortOrder;
    providerMessageId?: SortOrder;
    text?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumMessageDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageDirectionWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageDirection;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageDirectionFilter<$PrismaModel>;
    _max?: NestedEnumMessageDirectionFilter<$PrismaModel>;
  };

  export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>;
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>;
  };

  export type EnumMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>;
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type EnumWebhookStatusFilter<$PrismaModel = never> = {
    equals?:
      $Enums.WebhookStatus | EnumWebhookStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumWebhookStatusFilter<$PrismaModel> | $Enums.WebhookStatus;
  };

  export type WebhookEventCountOrderByAggregateInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    provider?: SortOrder;
    eventType?: SortOrder;
    status?: SortOrder;
    payload?: SortOrder;
    headers?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WebhookEventMaxOrderByAggregateInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    provider?: SortOrder;
    eventType?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WebhookEventMinOrderByAggregateInput = {
    id?: SortOrder;
    externalId?: SortOrder;
    provider?: SortOrder;
    eventType?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumWebhookStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      $Enums.WebhookStatus | EnumWebhookStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumWebhookStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.WebhookStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumWebhookStatusFilter<$PrismaModel>;
    _max?: NestedEnumWebhookStatusFilter<$PrismaModel>;
  };

  export type EnumAiRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AiRunStatus | EnumAiRunStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumAiRunStatusFilter<$PrismaModel> | $Enums.AiRunStatus;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type ToolExecutionListRelationFilter = {
    every?: ToolExecutionWhereInput;
    some?: ToolExecutionWhereInput;
    none?: ToolExecutionWhereInput;
  };

  export type ToolExecutionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AiRunCountOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    provider?: SortOrder;
    model?: SortOrder;
    providerResponseId?: SortOrder;
    status?: SortOrder;
    inputTokens?: SortOrder;
    outputTokens?: SortOrder;
    totalTokens?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrder;
  };

  export type AiRunAvgOrderByAggregateInput = {
    inputTokens?: SortOrder;
    outputTokens?: SortOrder;
    totalTokens?: SortOrder;
  };

  export type AiRunMaxOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    provider?: SortOrder;
    model?: SortOrder;
    providerResponseId?: SortOrder;
    status?: SortOrder;
    inputTokens?: SortOrder;
    outputTokens?: SortOrder;
    totalTokens?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrder;
  };

  export type AiRunMinOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    provider?: SortOrder;
    model?: SortOrder;
    providerResponseId?: SortOrder;
    status?: SortOrder;
    inputTokens?: SortOrder;
    outputTokens?: SortOrder;
    totalTokens?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrder;
  };

  export type AiRunSumOrderByAggregateInput = {
    inputTokens?: SortOrder;
    outputTokens?: SortOrder;
    totalTokens?: SortOrder;
  };

  export type EnumAiRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AiRunStatus | EnumAiRunStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumAiRunStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.AiRunStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAiRunStatusFilter<$PrismaModel>;
    _max?: NestedEnumAiRunStatusFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type EnumToolExecutionStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ToolExecutionStatus
      | EnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumToolExecutionStatusFilter<$PrismaModel>
      | $Enums.ToolExecutionStatus;
  };

  export type AiRunScalarRelationFilter = {
    is?: AiRunWhereInput;
    isNot?: AiRunWhereInput;
  };

  export type ToolExecutionCountOrderByAggregateInput = {
    id?: SortOrder;
    aiRunId?: SortOrder;
    toolName?: SortOrder;
    input?: SortOrder;
    output?: SortOrder;
    status?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrder;
  };

  export type ToolExecutionMaxOrderByAggregateInput = {
    id?: SortOrder;
    aiRunId?: SortOrder;
    toolName?: SortOrder;
    status?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrder;
  };

  export type ToolExecutionMinOrderByAggregateInput = {
    id?: SortOrder;
    aiRunId?: SortOrder;
    toolName?: SortOrder;
    status?: SortOrder;
    error?: SortOrder;
    createdAt?: SortOrder;
    completedAt?: SortOrder;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          'path'
        >
      >;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type EnumToolExecutionStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ToolExecutionStatus
      | EnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumToolExecutionStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ToolExecutionStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumToolExecutionStatusFilter<$PrismaModel>;
    _max?: NestedEnumToolExecutionStatusFilter<$PrismaModel>;
  };

  export type EnumHandoffStatusFilter<$PrismaModel = never> = {
    equals?:
      $Enums.HandoffStatus | EnumHandoffStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumHandoffStatusFilter<$PrismaModel> | $Enums.HandoffStatus;
  };

  export type HandoffCountOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    status?: SortOrder;
    reason?: SortOrder;
    assignedAgentId?: SortOrder;
    requestedAt?: SortOrder;
    acceptedAt?: SortOrder;
    closedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HandoffMaxOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    status?: SortOrder;
    reason?: SortOrder;
    assignedAgentId?: SortOrder;
    requestedAt?: SortOrder;
    acceptedAt?: SortOrder;
    closedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HandoffMinOrderByAggregateInput = {
    id?: SortOrder;
    conversationId?: SortOrder;
    status?: SortOrder;
    reason?: SortOrder;
    assignedAgentId?: SortOrder;
    requestedAt?: SortOrder;
    acceptedAt?: SortOrder;
    closedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumHandoffStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      $Enums.HandoffStatus | EnumHandoffStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumHandoffStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.HandoffStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumHandoffStatusFilter<$PrismaModel>;
    _max?: NestedEnumHandoffStatusFilter<$PrismaModel>;
  };

  export type ConversationCreateNestedManyWithoutContactInput = {
    create?:
      | XOR<
          ConversationCreateWithoutContactInput,
          ConversationUncheckedCreateWithoutContactInput
        >
      | ConversationCreateWithoutContactInput[]
      | ConversationUncheckedCreateWithoutContactInput[];
    connectOrCreate?:
      | ConversationCreateOrConnectWithoutContactInput
      | ConversationCreateOrConnectWithoutContactInput[];
    createMany?: ConversationCreateManyContactInputEnvelope;
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
  };

  export type ConversationUncheckedCreateNestedManyWithoutContactInput = {
    create?:
      | XOR<
          ConversationCreateWithoutContactInput,
          ConversationUncheckedCreateWithoutContactInput
        >
      | ConversationCreateWithoutContactInput[]
      | ConversationUncheckedCreateWithoutContactInput[];
    connectOrCreate?:
      | ConversationCreateOrConnectWithoutContactInput
      | ConversationCreateOrConnectWithoutContactInput[];
    createMany?: ConversationCreateManyContactInputEnvelope;
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type ConversationUpdateManyWithoutContactNestedInput = {
    create?:
      | XOR<
          ConversationCreateWithoutContactInput,
          ConversationUncheckedCreateWithoutContactInput
        >
      | ConversationCreateWithoutContactInput[]
      | ConversationUncheckedCreateWithoutContactInput[];
    connectOrCreate?:
      | ConversationCreateOrConnectWithoutContactInput
      | ConversationCreateOrConnectWithoutContactInput[];
    upsert?:
      | ConversationUpsertWithWhereUniqueWithoutContactInput
      | ConversationUpsertWithWhereUniqueWithoutContactInput[];
    createMany?: ConversationCreateManyContactInputEnvelope;
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    update?:
      | ConversationUpdateWithWhereUniqueWithoutContactInput
      | ConversationUpdateWithWhereUniqueWithoutContactInput[];
    updateMany?:
      | ConversationUpdateManyWithWhereWithoutContactInput
      | ConversationUpdateManyWithWhereWithoutContactInput[];
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[];
  };

  export type ConversationUncheckedUpdateManyWithoutContactNestedInput = {
    create?:
      | XOR<
          ConversationCreateWithoutContactInput,
          ConversationUncheckedCreateWithoutContactInput
        >
      | ConversationCreateWithoutContactInput[]
      | ConversationUncheckedCreateWithoutContactInput[];
    connectOrCreate?:
      | ConversationCreateOrConnectWithoutContactInput
      | ConversationCreateOrConnectWithoutContactInput[];
    upsert?:
      | ConversationUpsertWithWhereUniqueWithoutContactInput
      | ConversationUpsertWithWhereUniqueWithoutContactInput[];
    createMany?: ConversationCreateManyContactInputEnvelope;
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[];
    update?:
      | ConversationUpdateWithWhereUniqueWithoutContactInput
      | ConversationUpdateWithWhereUniqueWithoutContactInput[];
    updateMany?:
      | ConversationUpdateManyWithWhereWithoutContactInput
      | ConversationUpdateManyWithWhereWithoutContactInput[];
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[];
  };

  export type ContactCreateNestedOneWithoutConversationsInput = {
    create?: XOR<
      ContactCreateWithoutConversationsInput,
      ContactUncheckedCreateWithoutConversationsInput
    >;
    connectOrCreate?: ContactCreateOrConnectWithoutConversationsInput;
    connect?: ContactWhereUniqueInput;
  };

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?:
      | XOR<
          MessageCreateWithoutConversationInput,
          MessageUncheckedCreateWithoutConversationInput
        >
      | MessageCreateWithoutConversationInput[]
      | MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutConversationInput
      | MessageCreateOrConnectWithoutConversationInput[];
    createMany?: MessageCreateManyConversationInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type AiRunCreateNestedManyWithoutConversationInput = {
    create?:
      | XOR<
          AiRunCreateWithoutConversationInput,
          AiRunUncheckedCreateWithoutConversationInput
        >
      | AiRunCreateWithoutConversationInput[]
      | AiRunUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | AiRunCreateOrConnectWithoutConversationInput
      | AiRunCreateOrConnectWithoutConversationInput[];
    createMany?: AiRunCreateManyConversationInputEnvelope;
    connect?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
  };

  export type HandoffCreateNestedManyWithoutConversationInput = {
    create?:
      | XOR<
          HandoffCreateWithoutConversationInput,
          HandoffUncheckedCreateWithoutConversationInput
        >
      | HandoffCreateWithoutConversationInput[]
      | HandoffUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | HandoffCreateOrConnectWithoutConversationInput
      | HandoffCreateOrConnectWithoutConversationInput[];
    createMany?: HandoffCreateManyConversationInputEnvelope;
    connect?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
  };

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?:
      | XOR<
          MessageCreateWithoutConversationInput,
          MessageUncheckedCreateWithoutConversationInput
        >
      | MessageCreateWithoutConversationInput[]
      | MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutConversationInput
      | MessageCreateOrConnectWithoutConversationInput[];
    createMany?: MessageCreateManyConversationInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type AiRunUncheckedCreateNestedManyWithoutConversationInput = {
    create?:
      | XOR<
          AiRunCreateWithoutConversationInput,
          AiRunUncheckedCreateWithoutConversationInput
        >
      | AiRunCreateWithoutConversationInput[]
      | AiRunUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | AiRunCreateOrConnectWithoutConversationInput
      | AiRunCreateOrConnectWithoutConversationInput[];
    createMany?: AiRunCreateManyConversationInputEnvelope;
    connect?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
  };

  export type HandoffUncheckedCreateNestedManyWithoutConversationInput = {
    create?:
      | XOR<
          HandoffCreateWithoutConversationInput,
          HandoffUncheckedCreateWithoutConversationInput
        >
      | HandoffCreateWithoutConversationInput[]
      | HandoffUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | HandoffCreateOrConnectWithoutConversationInput
      | HandoffCreateOrConnectWithoutConversationInput[];
    createMany?: HandoffCreateManyConversationInputEnvelope;
    connect?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
  };

  export type EnumConversationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConversationStatus;
  };

  export type ContactUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<
      ContactCreateWithoutConversationsInput,
      ContactUncheckedCreateWithoutConversationsInput
    >;
    connectOrCreate?: ContactCreateOrConnectWithoutConversationsInput;
    upsert?: ContactUpsertWithoutConversationsInput;
    connect?: ContactWhereUniqueInput;
    update?: XOR<
      XOR<
        ContactUpdateToOneWithWhereWithoutConversationsInput,
        ContactUpdateWithoutConversationsInput
      >,
      ContactUncheckedUpdateWithoutConversationsInput
    >;
  };

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutConversationInput,
          MessageUncheckedCreateWithoutConversationInput
        >
      | MessageCreateWithoutConversationInput[]
      | MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutConversationInput
      | MessageCreateOrConnectWithoutConversationInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutConversationInput
      | MessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: MessageCreateManyConversationInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutConversationInput
      | MessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutConversationInput
      | MessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type AiRunUpdateManyWithoutConversationNestedInput = {
    create?:
      | XOR<
          AiRunCreateWithoutConversationInput,
          AiRunUncheckedCreateWithoutConversationInput
        >
      | AiRunCreateWithoutConversationInput[]
      | AiRunUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | AiRunCreateOrConnectWithoutConversationInput
      | AiRunCreateOrConnectWithoutConversationInput[];
    upsert?:
      | AiRunUpsertWithWhereUniqueWithoutConversationInput
      | AiRunUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: AiRunCreateManyConversationInputEnvelope;
    set?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    disconnect?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    delete?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    connect?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    update?:
      | AiRunUpdateWithWhereUniqueWithoutConversationInput
      | AiRunUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?:
      | AiRunUpdateManyWithWhereWithoutConversationInput
      | AiRunUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: AiRunScalarWhereInput | AiRunScalarWhereInput[];
  };

  export type HandoffUpdateManyWithoutConversationNestedInput = {
    create?:
      | XOR<
          HandoffCreateWithoutConversationInput,
          HandoffUncheckedCreateWithoutConversationInput
        >
      | HandoffCreateWithoutConversationInput[]
      | HandoffUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | HandoffCreateOrConnectWithoutConversationInput
      | HandoffCreateOrConnectWithoutConversationInput[];
    upsert?:
      | HandoffUpsertWithWhereUniqueWithoutConversationInput
      | HandoffUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: HandoffCreateManyConversationInputEnvelope;
    set?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    disconnect?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    delete?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    connect?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    update?:
      | HandoffUpdateWithWhereUniqueWithoutConversationInput
      | HandoffUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?:
      | HandoffUpdateManyWithWhereWithoutConversationInput
      | HandoffUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: HandoffScalarWhereInput | HandoffScalarWhereInput[];
  };

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutConversationInput,
          MessageUncheckedCreateWithoutConversationInput
        >
      | MessageCreateWithoutConversationInput[]
      | MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutConversationInput
      | MessageCreateOrConnectWithoutConversationInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutConversationInput
      | MessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: MessageCreateManyConversationInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutConversationInput
      | MessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutConversationInput
      | MessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type AiRunUncheckedUpdateManyWithoutConversationNestedInput = {
    create?:
      | XOR<
          AiRunCreateWithoutConversationInput,
          AiRunUncheckedCreateWithoutConversationInput
        >
      | AiRunCreateWithoutConversationInput[]
      | AiRunUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | AiRunCreateOrConnectWithoutConversationInput
      | AiRunCreateOrConnectWithoutConversationInput[];
    upsert?:
      | AiRunUpsertWithWhereUniqueWithoutConversationInput
      | AiRunUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: AiRunCreateManyConversationInputEnvelope;
    set?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    disconnect?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    delete?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    connect?: AiRunWhereUniqueInput | AiRunWhereUniqueInput[];
    update?:
      | AiRunUpdateWithWhereUniqueWithoutConversationInput
      | AiRunUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?:
      | AiRunUpdateManyWithWhereWithoutConversationInput
      | AiRunUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: AiRunScalarWhereInput | AiRunScalarWhereInput[];
  };

  export type HandoffUncheckedUpdateManyWithoutConversationNestedInput = {
    create?:
      | XOR<
          HandoffCreateWithoutConversationInput,
          HandoffUncheckedCreateWithoutConversationInput
        >
      | HandoffCreateWithoutConversationInput[]
      | HandoffUncheckedCreateWithoutConversationInput[];
    connectOrCreate?:
      | HandoffCreateOrConnectWithoutConversationInput
      | HandoffCreateOrConnectWithoutConversationInput[];
    upsert?:
      | HandoffUpsertWithWhereUniqueWithoutConversationInput
      | HandoffUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: HandoffCreateManyConversationInputEnvelope;
    set?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    disconnect?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    delete?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    connect?: HandoffWhereUniqueInput | HandoffWhereUniqueInput[];
    update?:
      | HandoffUpdateWithWhereUniqueWithoutConversationInput
      | HandoffUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?:
      | HandoffUpdateManyWithWhereWithoutConversationInput
      | HandoffUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: HandoffScalarWhereInput | HandoffScalarWhereInput[];
  };

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<
      ConversationCreateWithoutMessagesInput,
      ConversationUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput;
    connect?: ConversationWhereUniqueInput;
  };

  export type EnumMessageDirectionFieldUpdateOperationsInput = {
    set?: $Enums.MessageDirection;
  };

  export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType;
  };

  export type EnumMessageStatusFieldUpdateOperationsInput = {
    set?: $Enums.MessageStatus;
  };

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<
      ConversationCreateWithoutMessagesInput,
      ConversationUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput;
    upsert?: ConversationUpsertWithoutMessagesInput;
    connect?: ConversationWhereUniqueInput;
    update?: XOR<
      XOR<
        ConversationUpdateToOneWithWhereWithoutMessagesInput,
        ConversationUpdateWithoutMessagesInput
      >,
      ConversationUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type EnumWebhookStatusFieldUpdateOperationsInput = {
    set?: $Enums.WebhookStatus;
  };

  export type ConversationCreateNestedOneWithoutAiRunsInput = {
    create?: XOR<
      ConversationCreateWithoutAiRunsInput,
      ConversationUncheckedCreateWithoutAiRunsInput
    >;
    connectOrCreate?: ConversationCreateOrConnectWithoutAiRunsInput;
    connect?: ConversationWhereUniqueInput;
  };

  export type ToolExecutionCreateNestedManyWithoutAiRunInput = {
    create?:
      | XOR<
          ToolExecutionCreateWithoutAiRunInput,
          ToolExecutionUncheckedCreateWithoutAiRunInput
        >
      | ToolExecutionCreateWithoutAiRunInput[]
      | ToolExecutionUncheckedCreateWithoutAiRunInput[];
    connectOrCreate?:
      | ToolExecutionCreateOrConnectWithoutAiRunInput
      | ToolExecutionCreateOrConnectWithoutAiRunInput[];
    createMany?: ToolExecutionCreateManyAiRunInputEnvelope;
    connect?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
  };

  export type ToolExecutionUncheckedCreateNestedManyWithoutAiRunInput = {
    create?:
      | XOR<
          ToolExecutionCreateWithoutAiRunInput,
          ToolExecutionUncheckedCreateWithoutAiRunInput
        >
      | ToolExecutionCreateWithoutAiRunInput[]
      | ToolExecutionUncheckedCreateWithoutAiRunInput[];
    connectOrCreate?:
      | ToolExecutionCreateOrConnectWithoutAiRunInput
      | ToolExecutionCreateOrConnectWithoutAiRunInput[];
    createMany?: ToolExecutionCreateManyAiRunInputEnvelope;
    connect?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
  };

  export type EnumAiRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.AiRunStatus;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type ConversationUpdateOneRequiredWithoutAiRunsNestedInput = {
    create?: XOR<
      ConversationCreateWithoutAiRunsInput,
      ConversationUncheckedCreateWithoutAiRunsInput
    >;
    connectOrCreate?: ConversationCreateOrConnectWithoutAiRunsInput;
    upsert?: ConversationUpsertWithoutAiRunsInput;
    connect?: ConversationWhereUniqueInput;
    update?: XOR<
      XOR<
        ConversationUpdateToOneWithWhereWithoutAiRunsInput,
        ConversationUpdateWithoutAiRunsInput
      >,
      ConversationUncheckedUpdateWithoutAiRunsInput
    >;
  };

  export type ToolExecutionUpdateManyWithoutAiRunNestedInput = {
    create?:
      | XOR<
          ToolExecutionCreateWithoutAiRunInput,
          ToolExecutionUncheckedCreateWithoutAiRunInput
        >
      | ToolExecutionCreateWithoutAiRunInput[]
      | ToolExecutionUncheckedCreateWithoutAiRunInput[];
    connectOrCreate?:
      | ToolExecutionCreateOrConnectWithoutAiRunInput
      | ToolExecutionCreateOrConnectWithoutAiRunInput[];
    upsert?:
      | ToolExecutionUpsertWithWhereUniqueWithoutAiRunInput
      | ToolExecutionUpsertWithWhereUniqueWithoutAiRunInput[];
    createMany?: ToolExecutionCreateManyAiRunInputEnvelope;
    set?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    disconnect?:
      ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    delete?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    connect?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    update?:
      | ToolExecutionUpdateWithWhereUniqueWithoutAiRunInput
      | ToolExecutionUpdateWithWhereUniqueWithoutAiRunInput[];
    updateMany?:
      | ToolExecutionUpdateManyWithWhereWithoutAiRunInput
      | ToolExecutionUpdateManyWithWhereWithoutAiRunInput[];
    deleteMany?:
      ToolExecutionScalarWhereInput | ToolExecutionScalarWhereInput[];
  };

  export type ToolExecutionUncheckedUpdateManyWithoutAiRunNestedInput = {
    create?:
      | XOR<
          ToolExecutionCreateWithoutAiRunInput,
          ToolExecutionUncheckedCreateWithoutAiRunInput
        >
      | ToolExecutionCreateWithoutAiRunInput[]
      | ToolExecutionUncheckedCreateWithoutAiRunInput[];
    connectOrCreate?:
      | ToolExecutionCreateOrConnectWithoutAiRunInput
      | ToolExecutionCreateOrConnectWithoutAiRunInput[];
    upsert?:
      | ToolExecutionUpsertWithWhereUniqueWithoutAiRunInput
      | ToolExecutionUpsertWithWhereUniqueWithoutAiRunInput[];
    createMany?: ToolExecutionCreateManyAiRunInputEnvelope;
    set?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    disconnect?:
      ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    delete?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    connect?: ToolExecutionWhereUniqueInput | ToolExecutionWhereUniqueInput[];
    update?:
      | ToolExecutionUpdateWithWhereUniqueWithoutAiRunInput
      | ToolExecutionUpdateWithWhereUniqueWithoutAiRunInput[];
    updateMany?:
      | ToolExecutionUpdateManyWithWhereWithoutAiRunInput
      | ToolExecutionUpdateManyWithWhereWithoutAiRunInput[];
    deleteMany?:
      ToolExecutionScalarWhereInput | ToolExecutionScalarWhereInput[];
  };

  export type AiRunCreateNestedOneWithoutToolExecutionsInput = {
    create?: XOR<
      AiRunCreateWithoutToolExecutionsInput,
      AiRunUncheckedCreateWithoutToolExecutionsInput
    >;
    connectOrCreate?: AiRunCreateOrConnectWithoutToolExecutionsInput;
    connect?: AiRunWhereUniqueInput;
  };

  export type EnumToolExecutionStatusFieldUpdateOperationsInput = {
    set?: $Enums.ToolExecutionStatus;
  };

  export type AiRunUpdateOneRequiredWithoutToolExecutionsNestedInput = {
    create?: XOR<
      AiRunCreateWithoutToolExecutionsInput,
      AiRunUncheckedCreateWithoutToolExecutionsInput
    >;
    connectOrCreate?: AiRunCreateOrConnectWithoutToolExecutionsInput;
    upsert?: AiRunUpsertWithoutToolExecutionsInput;
    connect?: AiRunWhereUniqueInput;
    update?: XOR<
      XOR<
        AiRunUpdateToOneWithWhereWithoutToolExecutionsInput,
        AiRunUpdateWithoutToolExecutionsInput
      >,
      AiRunUncheckedUpdateWithoutToolExecutionsInput
    >;
  };

  export type ConversationCreateNestedOneWithoutHandoffsInput = {
    create?: XOR<
      ConversationCreateWithoutHandoffsInput,
      ConversationUncheckedCreateWithoutHandoffsInput
    >;
    connectOrCreate?: ConversationCreateOrConnectWithoutHandoffsInput;
    connect?: ConversationWhereUniqueInput;
  };

  export type EnumHandoffStatusFieldUpdateOperationsInput = {
    set?: $Enums.HandoffStatus;
  };

  export type ConversationUpdateOneRequiredWithoutHandoffsNestedInput = {
    create?: XOR<
      ConversationCreateWithoutHandoffsInput,
      ConversationUncheckedCreateWithoutHandoffsInput
    >;
    connectOrCreate?: ConversationCreateOrConnectWithoutHandoffsInput;
    upsert?: ConversationUpsertWithoutHandoffsInput;
    connect?: ConversationWhereUniqueInput;
    update?: XOR<
      XOR<
        ConversationUpdateToOneWithWhereWithoutHandoffsInput,
        ConversationUpdateWithoutHandoffsInput
      >,
      ConversationUncheckedUpdateWithoutHandoffsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumConversationStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ConversationStatus
      | EnumConversationStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ConversationStatus[]
      | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ConversationStatus[]
      | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumConversationStatusFilter<$PrismaModel>
      | $Enums.ConversationStatus;
  };

  export type NestedEnumConversationStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ConversationStatus
      | EnumConversationStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ConversationStatus[]
      | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ConversationStatus[]
      | ListEnumConversationStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ConversationStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumConversationStatusFilter<$PrismaModel>;
    _max?: NestedEnumConversationStatusFilter<$PrismaModel>;
  };

  export type NestedEnumMessageDirectionFilter<$PrismaModel = never> = {
    equals?:
      $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    not?:
      NestedEnumMessageDirectionFilter<$PrismaModel> | $Enums.MessageDirection;
  };

  export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType;
  };

  export type NestedEnumMessageStatusFilter<$PrismaModel = never> = {
    equals?:
      $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus;
  };

  export type NestedEnumMessageDirectionWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageDirection[]
      | ListEnumMessageDirectionFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageDirectionWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageDirection;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageDirectionFilter<$PrismaModel>;
    _max?: NestedEnumMessageDirectionFilter<$PrismaModel>;
  };

  export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
      in?:
        $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
      notIn?:
        $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel>
        | $Enums.MessageType;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumMessageTypeFilter<$PrismaModel>;
      _max?: NestedEnumMessageTypeFilter<$PrismaModel>;
    };

  export type NestedEnumMessageStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>;
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedEnumWebhookStatusFilter<$PrismaModel = never> = {
    equals?:
      $Enums.WebhookStatus | EnumWebhookStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumWebhookStatusFilter<$PrismaModel> | $Enums.WebhookStatus;
  };

  export type NestedEnumWebhookStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      $Enums.WebhookStatus | EnumWebhookStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.WebhookStatus[] | ListEnumWebhookStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumWebhookStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.WebhookStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumWebhookStatusFilter<$PrismaModel>;
    _max?: NestedEnumWebhookStatusFilter<$PrismaModel>;
  };

  export type NestedEnumAiRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AiRunStatus | EnumAiRunStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumAiRunStatusFilter<$PrismaModel> | $Enums.AiRunStatus;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedEnumAiRunStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.AiRunStatus | EnumAiRunStatusFieldRefInput<$PrismaModel>;
      in?:
        $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
      notIn?:
        $Enums.AiRunStatus[] | ListEnumAiRunStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumAiRunStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.AiRunStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumAiRunStatusFilter<$PrismaModel>;
      _max?: NestedEnumAiRunStatusFilter<$PrismaModel>;
    };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedEnumToolExecutionStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ToolExecutionStatus
      | EnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumToolExecutionStatusFilter<$PrismaModel>
      | $Enums.ToolExecutionStatus;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
      >;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedEnumToolExecutionStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ToolExecutionStatus
      | EnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ToolExecutionStatus[]
      | ListEnumToolExecutionStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumToolExecutionStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ToolExecutionStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumToolExecutionStatusFilter<$PrismaModel>;
    _max?: NestedEnumToolExecutionStatusFilter<$PrismaModel>;
  };

  export type NestedEnumHandoffStatusFilter<$PrismaModel = never> = {
    equals?:
      $Enums.HandoffStatus | EnumHandoffStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumHandoffStatusFilter<$PrismaModel> | $Enums.HandoffStatus;
  };

  export type NestedEnumHandoffStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      $Enums.HandoffStatus | EnumHandoffStatusFieldRefInput<$PrismaModel>;
    in?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    notIn?:
      $Enums.HandoffStatus[] | ListEnumHandoffStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumHandoffStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.HandoffStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumHandoffStatusFilter<$PrismaModel>;
    _max?: NestedEnumHandoffStatusFilter<$PrismaModel>;
  };

  export type ConversationCreateWithoutContactInput = {
    id?: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: MessageCreateNestedManyWithoutConversationInput;
    aiRuns?: AiRunCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffCreateNestedManyWithoutConversationInput;
  };

  export type ConversationUncheckedCreateWithoutContactInput = {
    id?: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput;
    aiRuns?: AiRunUncheckedCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffUncheckedCreateNestedManyWithoutConversationInput;
  };

  export type ConversationCreateOrConnectWithoutContactInput = {
    where: ConversationWhereUniqueInput;
    create: XOR<
      ConversationCreateWithoutContactInput,
      ConversationUncheckedCreateWithoutContactInput
    >;
  };

  export type ConversationCreateManyContactInputEnvelope = {
    data:
      ConversationCreateManyContactInput | ConversationCreateManyContactInput[];
    skipDuplicates?: boolean;
  };

  export type ConversationUpsertWithWhereUniqueWithoutContactInput = {
    where: ConversationWhereUniqueInput;
    update: XOR<
      ConversationUpdateWithoutContactInput,
      ConversationUncheckedUpdateWithoutContactInput
    >;
    create: XOR<
      ConversationCreateWithoutContactInput,
      ConversationUncheckedCreateWithoutContactInput
    >;
  };

  export type ConversationUpdateWithWhereUniqueWithoutContactInput = {
    where: ConversationWhereUniqueInput;
    data: XOR<
      ConversationUpdateWithoutContactInput,
      ConversationUncheckedUpdateWithoutContactInput
    >;
  };

  export type ConversationUpdateManyWithWhereWithoutContactInput = {
    where: ConversationScalarWhereInput;
    data: XOR<
      ConversationUpdateManyMutationInput,
      ConversationUncheckedUpdateManyWithoutContactInput
    >;
  };

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[];
    OR?: ConversationScalarWhereInput[];
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[];
    id?: StringFilter<'Conversation'> | string;
    contactId?: StringFilter<'Conversation'> | string;
    status?:
      EnumConversationStatusFilter<'Conversation'> | $Enums.ConversationStatus;
    locale?: StringFilter<'Conversation'> | string;
    createdAt?: DateTimeFilter<'Conversation'> | Date | string;
    updatedAt?: DateTimeFilter<'Conversation'> | Date | string;
  };

  export type ContactCreateWithoutConversationsInput = {
    id?: string;
    externalId: string;
    name?: string | null;
    phoneNumber: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ContactUncheckedCreateWithoutConversationsInput = {
    id?: string;
    externalId: string;
    name?: string | null;
    phoneNumber: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ContactCreateOrConnectWithoutConversationsInput = {
    where: ContactWhereUniqueInput;
    create: XOR<
      ContactCreateWithoutConversationsInput,
      ContactUncheckedCreateWithoutConversationsInput
    >;
  };

  export type MessageCreateWithoutConversationInput = {
    id?: string;
    direction: $Enums.MessageDirection;
    type: $Enums.MessageType;
    providerMessageId?: string | null;
    text?: string | null;
    status: $Enums.MessageStatus;
    metadata: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string;
    direction: $Enums.MessageDirection;
    type: $Enums.MessageType;
    providerMessageId?: string | null;
    text?: string | null;
    status: $Enums.MessageStatus;
    metadata: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutConversationInput,
      MessageUncheckedCreateWithoutConversationInput
    >;
  };

  export type MessageCreateManyConversationInputEnvelope = {
    data:
      MessageCreateManyConversationInput | MessageCreateManyConversationInput[];
    skipDuplicates?: boolean;
  };

  export type AiRunCreateWithoutConversationInput = {
    id?: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    toolExecutions?: ToolExecutionCreateNestedManyWithoutAiRunInput;
  };

  export type AiRunUncheckedCreateWithoutConversationInput = {
    id?: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    toolExecutions?: ToolExecutionUncheckedCreateNestedManyWithoutAiRunInput;
  };

  export type AiRunCreateOrConnectWithoutConversationInput = {
    where: AiRunWhereUniqueInput;
    create: XOR<
      AiRunCreateWithoutConversationInput,
      AiRunUncheckedCreateWithoutConversationInput
    >;
  };

  export type AiRunCreateManyConversationInputEnvelope = {
    data: AiRunCreateManyConversationInput | AiRunCreateManyConversationInput[];
    skipDuplicates?: boolean;
  };

  export type HandoffCreateWithoutConversationInput = {
    id?: string;
    status: $Enums.HandoffStatus;
    reason?: string | null;
    assignedAgentId?: string | null;
    requestedAt: Date | string;
    acceptedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HandoffUncheckedCreateWithoutConversationInput = {
    id?: string;
    status: $Enums.HandoffStatus;
    reason?: string | null;
    assignedAgentId?: string | null;
    requestedAt: Date | string;
    acceptedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HandoffCreateOrConnectWithoutConversationInput = {
    where: HandoffWhereUniqueInput;
    create: XOR<
      HandoffCreateWithoutConversationInput,
      HandoffUncheckedCreateWithoutConversationInput
    >;
  };

  export type HandoffCreateManyConversationInputEnvelope = {
    data:
      HandoffCreateManyConversationInput | HandoffCreateManyConversationInput[];
    skipDuplicates?: boolean;
  };

  export type ContactUpsertWithoutConversationsInput = {
    update: XOR<
      ContactUpdateWithoutConversationsInput,
      ContactUncheckedUpdateWithoutConversationsInput
    >;
    create: XOR<
      ContactCreateWithoutConversationsInput,
      ContactUncheckedCreateWithoutConversationsInput
    >;
    where?: ContactWhereInput;
  };

  export type ContactUpdateToOneWithWhereWithoutConversationsInput = {
    where?: ContactWhereInput;
    data: XOR<
      ContactUpdateWithoutConversationsInput,
      ContactUncheckedUpdateWithoutConversationsInput
    >;
  };

  export type ContactUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ContactUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    externalId?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput;
    update: XOR<
      MessageUpdateWithoutConversationInput,
      MessageUncheckedUpdateWithoutConversationInput
    >;
    create: XOR<
      MessageCreateWithoutConversationInput,
      MessageUncheckedCreateWithoutConversationInput
    >;
  };

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput;
    data: XOR<
      MessageUpdateWithoutConversationInput,
      MessageUncheckedUpdateWithoutConversationInput
    >;
  };

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput;
    data: XOR<
      MessageUpdateManyMutationInput,
      MessageUncheckedUpdateManyWithoutConversationInput
    >;
  };

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[];
    OR?: MessageScalarWhereInput[];
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[];
    id?: StringFilter<'Message'> | string;
    conversationId?: StringFilter<'Message'> | string;
    direction?: EnumMessageDirectionFilter<'Message'> | $Enums.MessageDirection;
    type?: EnumMessageTypeFilter<'Message'> | $Enums.MessageType;
    providerMessageId?: StringNullableFilter<'Message'> | string | null;
    text?: StringNullableFilter<'Message'> | string | null;
    status?: EnumMessageStatusFilter<'Message'> | $Enums.MessageStatus;
    metadata?: JsonFilter<'Message'>;
    createdAt?: DateTimeFilter<'Message'> | Date | string;
    updatedAt?: DateTimeFilter<'Message'> | Date | string;
  };

  export type AiRunUpsertWithWhereUniqueWithoutConversationInput = {
    where: AiRunWhereUniqueInput;
    update: XOR<
      AiRunUpdateWithoutConversationInput,
      AiRunUncheckedUpdateWithoutConversationInput
    >;
    create: XOR<
      AiRunCreateWithoutConversationInput,
      AiRunUncheckedCreateWithoutConversationInput
    >;
  };

  export type AiRunUpdateWithWhereUniqueWithoutConversationInput = {
    where: AiRunWhereUniqueInput;
    data: XOR<
      AiRunUpdateWithoutConversationInput,
      AiRunUncheckedUpdateWithoutConversationInput
    >;
  };

  export type AiRunUpdateManyWithWhereWithoutConversationInput = {
    where: AiRunScalarWhereInput;
    data: XOR<
      AiRunUpdateManyMutationInput,
      AiRunUncheckedUpdateManyWithoutConversationInput
    >;
  };

  export type AiRunScalarWhereInput = {
    AND?: AiRunScalarWhereInput | AiRunScalarWhereInput[];
    OR?: AiRunScalarWhereInput[];
    NOT?: AiRunScalarWhereInput | AiRunScalarWhereInput[];
    id?: StringFilter<'AiRun'> | string;
    conversationId?: StringFilter<'AiRun'> | string;
    provider?: StringFilter<'AiRun'> | string;
    model?: StringFilter<'AiRun'> | string;
    providerResponseId?: StringNullableFilter<'AiRun'> | string | null;
    status?: EnumAiRunStatusFilter<'AiRun'> | $Enums.AiRunStatus;
    inputTokens?: IntNullableFilter<'AiRun'> | number | null;
    outputTokens?: IntNullableFilter<'AiRun'> | number | null;
    totalTokens?: IntNullableFilter<'AiRun'> | number | null;
    error?: StringNullableFilter<'AiRun'> | string | null;
    createdAt?: DateTimeFilter<'AiRun'> | Date | string;
    completedAt?: DateTimeNullableFilter<'AiRun'> | Date | string | null;
  };

  export type HandoffUpsertWithWhereUniqueWithoutConversationInput = {
    where: HandoffWhereUniqueInput;
    update: XOR<
      HandoffUpdateWithoutConversationInput,
      HandoffUncheckedUpdateWithoutConversationInput
    >;
    create: XOR<
      HandoffCreateWithoutConversationInput,
      HandoffUncheckedCreateWithoutConversationInput
    >;
  };

  export type HandoffUpdateWithWhereUniqueWithoutConversationInput = {
    where: HandoffWhereUniqueInput;
    data: XOR<
      HandoffUpdateWithoutConversationInput,
      HandoffUncheckedUpdateWithoutConversationInput
    >;
  };

  export type HandoffUpdateManyWithWhereWithoutConversationInput = {
    where: HandoffScalarWhereInput;
    data: XOR<
      HandoffUpdateManyMutationInput,
      HandoffUncheckedUpdateManyWithoutConversationInput
    >;
  };

  export type HandoffScalarWhereInput = {
    AND?: HandoffScalarWhereInput | HandoffScalarWhereInput[];
    OR?: HandoffScalarWhereInput[];
    NOT?: HandoffScalarWhereInput | HandoffScalarWhereInput[];
    id?: StringFilter<'Handoff'> | string;
    conversationId?: StringFilter<'Handoff'> | string;
    status?: EnumHandoffStatusFilter<'Handoff'> | $Enums.HandoffStatus;
    reason?: StringNullableFilter<'Handoff'> | string | null;
    assignedAgentId?: StringNullableFilter<'Handoff'> | string | null;
    requestedAt?: DateTimeFilter<'Handoff'> | Date | string;
    acceptedAt?: DateTimeNullableFilter<'Handoff'> | Date | string | null;
    closedAt?: DateTimeNullableFilter<'Handoff'> | Date | string | null;
    createdAt?: DateTimeFilter<'Handoff'> | Date | string;
    updatedAt?: DateTimeFilter<'Handoff'> | Date | string;
  };

  export type ConversationCreateWithoutMessagesInput = {
    id?: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contact: ContactCreateNestedOneWithoutConversationsInput;
    aiRuns?: AiRunCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffCreateNestedManyWithoutConversationInput;
  };

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string;
    contactId: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    aiRuns?: AiRunUncheckedCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffUncheckedCreateNestedManyWithoutConversationInput;
  };

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput;
    create: XOR<
      ConversationCreateWithoutMessagesInput,
      ConversationUncheckedCreateWithoutMessagesInput
    >;
  };

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<
      ConversationUpdateWithoutMessagesInput,
      ConversationUncheckedUpdateWithoutMessagesInput
    >;
    create: XOR<
      ConversationCreateWithoutMessagesInput,
      ConversationUncheckedCreateWithoutMessagesInput
    >;
    where?: ConversationWhereInput;
  };

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput;
    data: XOR<
      ConversationUpdateWithoutMessagesInput,
      ConversationUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    contact?: ContactUpdateOneRequiredWithoutConversationsNestedInput;
    aiRuns?: AiRunUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    contactId?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    aiRuns?: AiRunUncheckedUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUncheckedUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationCreateWithoutAiRunsInput = {
    id?: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contact: ContactCreateNestedOneWithoutConversationsInput;
    messages?: MessageCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffCreateNestedManyWithoutConversationInput;
  };

  export type ConversationUncheckedCreateWithoutAiRunsInput = {
    id?: string;
    contactId: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput;
    handoffs?: HandoffUncheckedCreateNestedManyWithoutConversationInput;
  };

  export type ConversationCreateOrConnectWithoutAiRunsInput = {
    where: ConversationWhereUniqueInput;
    create: XOR<
      ConversationCreateWithoutAiRunsInput,
      ConversationUncheckedCreateWithoutAiRunsInput
    >;
  };

  export type ToolExecutionCreateWithoutAiRunInput = {
    id?: string;
    toolName: string;
    input: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status: $Enums.ToolExecutionStatus;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type ToolExecutionUncheckedCreateWithoutAiRunInput = {
    id?: string;
    toolName: string;
    input: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status: $Enums.ToolExecutionStatus;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type ToolExecutionCreateOrConnectWithoutAiRunInput = {
    where: ToolExecutionWhereUniqueInput;
    create: XOR<
      ToolExecutionCreateWithoutAiRunInput,
      ToolExecutionUncheckedCreateWithoutAiRunInput
    >;
  };

  export type ToolExecutionCreateManyAiRunInputEnvelope = {
    data:
      ToolExecutionCreateManyAiRunInput | ToolExecutionCreateManyAiRunInput[];
    skipDuplicates?: boolean;
  };

  export type ConversationUpsertWithoutAiRunsInput = {
    update: XOR<
      ConversationUpdateWithoutAiRunsInput,
      ConversationUncheckedUpdateWithoutAiRunsInput
    >;
    create: XOR<
      ConversationCreateWithoutAiRunsInput,
      ConversationUncheckedCreateWithoutAiRunsInput
    >;
    where?: ConversationWhereInput;
  };

  export type ConversationUpdateToOneWithWhereWithoutAiRunsInput = {
    where?: ConversationWhereInput;
    data: XOR<
      ConversationUpdateWithoutAiRunsInput,
      ConversationUncheckedUpdateWithoutAiRunsInput
    >;
  };

  export type ConversationUpdateWithoutAiRunsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    contact?: ContactUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: MessageUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationUncheckedUpdateWithoutAiRunsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    contactId?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUncheckedUpdateManyWithoutConversationNestedInput;
  };

  export type ToolExecutionUpsertWithWhereUniqueWithoutAiRunInput = {
    where: ToolExecutionWhereUniqueInput;
    update: XOR<
      ToolExecutionUpdateWithoutAiRunInput,
      ToolExecutionUncheckedUpdateWithoutAiRunInput
    >;
    create: XOR<
      ToolExecutionCreateWithoutAiRunInput,
      ToolExecutionUncheckedCreateWithoutAiRunInput
    >;
  };

  export type ToolExecutionUpdateWithWhereUniqueWithoutAiRunInput = {
    where: ToolExecutionWhereUniqueInput;
    data: XOR<
      ToolExecutionUpdateWithoutAiRunInput,
      ToolExecutionUncheckedUpdateWithoutAiRunInput
    >;
  };

  export type ToolExecutionUpdateManyWithWhereWithoutAiRunInput = {
    where: ToolExecutionScalarWhereInput;
    data: XOR<
      ToolExecutionUpdateManyMutationInput,
      ToolExecutionUncheckedUpdateManyWithoutAiRunInput
    >;
  };

  export type ToolExecutionScalarWhereInput = {
    AND?: ToolExecutionScalarWhereInput | ToolExecutionScalarWhereInput[];
    OR?: ToolExecutionScalarWhereInput[];
    NOT?: ToolExecutionScalarWhereInput | ToolExecutionScalarWhereInput[];
    id?: StringFilter<'ToolExecution'> | string;
    aiRunId?: StringFilter<'ToolExecution'> | string;
    toolName?: StringFilter<'ToolExecution'> | string;
    input?: JsonFilter<'ToolExecution'>;
    output?: JsonNullableFilter<'ToolExecution'>;
    status?:
      | EnumToolExecutionStatusFilter<'ToolExecution'>
      | $Enums.ToolExecutionStatus;
    error?: StringNullableFilter<'ToolExecution'> | string | null;
    createdAt?: DateTimeFilter<'ToolExecution'> | Date | string;
    completedAt?:
      DateTimeNullableFilter<'ToolExecution'> | Date | string | null;
  };

  export type AiRunCreateWithoutToolExecutionsInput = {
    id?: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    conversation: ConversationCreateNestedOneWithoutAiRunsInput;
  };

  export type AiRunUncheckedCreateWithoutToolExecutionsInput = {
    id?: string;
    conversationId: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type AiRunCreateOrConnectWithoutToolExecutionsInput = {
    where: AiRunWhereUniqueInput;
    create: XOR<
      AiRunCreateWithoutToolExecutionsInput,
      AiRunUncheckedCreateWithoutToolExecutionsInput
    >;
  };

  export type AiRunUpsertWithoutToolExecutionsInput = {
    update: XOR<
      AiRunUpdateWithoutToolExecutionsInput,
      AiRunUncheckedUpdateWithoutToolExecutionsInput
    >;
    create: XOR<
      AiRunCreateWithoutToolExecutionsInput,
      AiRunUncheckedCreateWithoutToolExecutionsInput
    >;
    where?: AiRunWhereInput;
  };

  export type AiRunUpdateToOneWithWhereWithoutToolExecutionsInput = {
    where?: AiRunWhereInput;
    data: XOR<
      AiRunUpdateWithoutToolExecutionsInput,
      AiRunUncheckedUpdateWithoutToolExecutionsInput
    >;
  };

  export type AiRunUpdateWithoutToolExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    conversation?: ConversationUpdateOneRequiredWithoutAiRunsNestedInput;
  };

  export type AiRunUncheckedUpdateWithoutToolExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    conversationId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ConversationCreateWithoutHandoffsInput = {
    id?: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contact: ContactCreateNestedOneWithoutConversationsInput;
    messages?: MessageCreateNestedManyWithoutConversationInput;
    aiRuns?: AiRunCreateNestedManyWithoutConversationInput;
  };

  export type ConversationUncheckedCreateWithoutHandoffsInput = {
    id?: string;
    contactId: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput;
    aiRuns?: AiRunUncheckedCreateNestedManyWithoutConversationInput;
  };

  export type ConversationCreateOrConnectWithoutHandoffsInput = {
    where: ConversationWhereUniqueInput;
    create: XOR<
      ConversationCreateWithoutHandoffsInput,
      ConversationUncheckedCreateWithoutHandoffsInput
    >;
  };

  export type ConversationUpsertWithoutHandoffsInput = {
    update: XOR<
      ConversationUpdateWithoutHandoffsInput,
      ConversationUncheckedUpdateWithoutHandoffsInput
    >;
    create: XOR<
      ConversationCreateWithoutHandoffsInput,
      ConversationUncheckedCreateWithoutHandoffsInput
    >;
    where?: ConversationWhereInput;
  };

  export type ConversationUpdateToOneWithWhereWithoutHandoffsInput = {
    where?: ConversationWhereInput;
    data: XOR<
      ConversationUpdateWithoutHandoffsInput,
      ConversationUncheckedUpdateWithoutHandoffsInput
    >;
  };

  export type ConversationUpdateWithoutHandoffsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    contact?: ContactUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: MessageUpdateManyWithoutConversationNestedInput;
    aiRuns?: AiRunUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationUncheckedUpdateWithoutHandoffsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    contactId?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput;
    aiRuns?: AiRunUncheckedUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationCreateManyContactInput = {
    id?: string;
    status?: $Enums.ConversationStatus;
    locale?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ConversationUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: MessageUpdateManyWithoutConversationNestedInput;
    aiRuns?: AiRunUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput;
    aiRuns?: AiRunUncheckedUpdateManyWithoutConversationNestedInput;
    handoffs?: HandoffUncheckedUpdateManyWithoutConversationNestedInput;
  };

  export type ConversationUncheckedUpdateManyWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?:
      | EnumConversationStatusFieldUpdateOperationsInput
      | $Enums.ConversationStatus;
    locale?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageCreateManyConversationInput = {
    id?: string;
    direction: $Enums.MessageDirection;
    type: $Enums.MessageType;
    providerMessageId?: string | null;
    text?: string | null;
    status: $Enums.MessageStatus;
    metadata: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AiRunCreateManyConversationInput = {
    id?: string;
    provider: string;
    model: string;
    providerResponseId?: string | null;
    status: $Enums.AiRunStatus;
    inputTokens?: number | null;
    outputTokens?: number | null;
    totalTokens?: number | null;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type HandoffCreateManyConversationInput = {
    id?: string;
    status: $Enums.HandoffStatus;
    reason?: string | null;
    assignedAgentId?: string | null;
    requestedAt: Date | string;
    acceptedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    direction?:
      EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection;
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    providerMessageId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    text?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    metadata?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    direction?:
      EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection;
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    providerMessageId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    text?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    metadata?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    direction?:
      EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection;
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    providerMessageId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    text?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    metadata?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AiRunUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    toolExecutions?: ToolExecutionUpdateManyWithoutAiRunNestedInput;
  };

  export type AiRunUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    toolExecutions?: ToolExecutionUncheckedUpdateManyWithoutAiRunNestedInput;
  };

  export type AiRunUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    model?: StringFieldUpdateOperationsInput | string;
    providerResponseId?:
      NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAiRunStatusFieldUpdateOperationsInput | $Enums.AiRunStatus;
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type HandoffUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumHandoffStatusFieldUpdateOperationsInput | $Enums.HandoffStatus;
    reason?: NullableStringFieldUpdateOperationsInput | string | null;
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null;
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    acceptedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HandoffUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumHandoffStatusFieldUpdateOperationsInput | $Enums.HandoffStatus;
    reason?: NullableStringFieldUpdateOperationsInput | string | null;
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null;
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    acceptedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HandoffUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumHandoffStatusFieldUpdateOperationsInput | $Enums.HandoffStatus;
    reason?: NullableStringFieldUpdateOperationsInput | string | null;
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null;
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    acceptedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ToolExecutionCreateManyAiRunInput = {
    id?: string;
    toolName: string;
    input: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status: $Enums.ToolExecutionStatus;
    error?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
  };

  export type ToolExecutionUpdateWithoutAiRunInput = {
    id?: StringFieldUpdateOperationsInput | string;
    toolName?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status?:
      | EnumToolExecutionStatusFieldUpdateOperationsInput
      | $Enums.ToolExecutionStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ToolExecutionUncheckedUpdateWithoutAiRunInput = {
    id?: StringFieldUpdateOperationsInput | string;
    toolName?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status?:
      | EnumToolExecutionStatusFieldUpdateOperationsInput
      | $Enums.ToolExecutionStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ToolExecutionUncheckedUpdateManyWithoutAiRunInput = {
    id?: StringFieldUpdateOperationsInput | string;
    toolName?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    output?: NullableJsonNullValueInput | InputJsonValue;
    status?:
      | EnumToolExecutionStatusFieldUpdateOperationsInput
      | $Enums.ToolExecutionStatus;
    error?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?:
      NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
