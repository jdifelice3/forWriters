
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AppFile
 * 
 */
export type AppFile = $Result.DefaultSelection<Prisma.$AppFilePayload>
/**
 * Model Reading
 * 
 */
export type Reading = $Result.DefaultSelection<Prisma.$ReadingPayload>
/**
 * Model ReadingAuthor
 * 
 */
export type ReadingAuthor = $Result.DefaultSelection<Prisma.$ReadingAuthorPayload>
/**
 * Model ReadingFeedback
 * 
 */
export type ReadingFeedback = $Result.DefaultSelection<Prisma.$ReadingFeedbackPayload>
/**
 * Model ReadingManuscript
 * 
 */
export type ReadingManuscript = $Result.DefaultSelection<Prisma.$ReadingManuscriptPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model GroupAddress
 * 
 */
export type GroupAddress = $Result.DefaultSelection<Prisma.$GroupAddressPayload>
/**
 * Model GroupNews
 * 
 */
export type GroupNews = $Result.DefaultSelection<Prisma.$GroupNewsPayload>
/**
 * Model GroupUser
 * 
 */
export type GroupUser = $Result.DefaultSelection<Prisma.$GroupUserPayload>
/**
 * Model GroupUrl
 * 
 */
export type GroupUrl = $Result.DefaultSelection<Prisma.$GroupUrlPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model UserUrl
 * 
 */
export type UserUrl = $Result.DefaultSelection<Prisma.$UserUrlPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DocumentType: {
  MANUSCRIPT: 'MANUSCRIPT',
  FEEDBACK: 'FEEDBACK'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]


export const ParticipantType: {
  AUTHOR: 'AUTHOR',
  REVIEWER: 'REVIEWER'
};

export type ParticipantType = (typeof ParticipantType)[keyof typeof ParticipantType]


export const EventType: {
  READING: 'READING',
  RETREAT: 'RETREAT'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const Genre: {
  FANTASY: 'FANTASY',
  HISTORICAL: 'HISTORICAL',
  HORROR: 'HORROR',
  LITERARY: 'LITERARY',
  MYSTERY: 'MYSTERY',
  POEM: 'POEM',
  ROMANCE: 'ROMANCE',
  SCIENCEFICTION: 'SCIENCEFICTION'
};

export type Genre = (typeof Genre)[keyof typeof Genre]


export const GroupType: {
  WRITING: 'WRITING'
};

export type GroupType = (typeof GroupType)[keyof typeof GroupType]


export const FileType: {
  DOCX: 'DOCX',
  PDF: 'PDF'
};

export type FileType = (typeof FileType)[keyof typeof FileType]


export const Role: {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  READER: 'READER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const UrlOwnerType: {
  USER: 'USER',
  WRITINGGROUP: 'WRITINGGROUP'
};

export type UrlOwnerType = (typeof UrlOwnerType)[keyof typeof UrlOwnerType]


export const UrlType: {
  AUDIO: 'AUDIO',
  FACEBOOK: 'FACEBOOK',
  IMAGE: 'IMAGE',
  LINKEDIN: 'LINKEDIN',
  MEETUP: 'MEETUP',
  SUBSTACK: 'SUBSTACK',
  WEBSITE: 'WEBSITE',
  YOUTUBE: 'YOUTUBE'
};

export type UrlType = (typeof UrlType)[keyof typeof UrlType]


export const WorkType: {
  FLASHFICTION: 'FLASHFICTION',
  NOVEL: 'NOVEL',
  NOVELLA: 'NOVELLA',
  NOVELETTE: 'NOVELETTE',
  PLAY: 'PLAY',
  SCREENPLAY: 'SCREENPLAY',
  SERIALIZEDFICTION: 'SERIALIZEDFICTION',
  SHORTSTORY: 'SHORTSTORY'
};

export type WorkType = (typeof WorkType)[keyof typeof WorkType]

}

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

export type ParticipantType = $Enums.ParticipantType

export const ParticipantType: typeof $Enums.ParticipantType

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type Genre = $Enums.Genre

export const Genre: typeof $Enums.Genre

export type GroupType = $Enums.GroupType

export const GroupType: typeof $Enums.GroupType

export type FileType = $Enums.FileType

export const FileType: typeof $Enums.FileType

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type UrlOwnerType = $Enums.UrlOwnerType

export const UrlOwnerType: typeof $Enums.UrlOwnerType

export type UrlType = $Enums.UrlType

export const UrlType: typeof $Enums.UrlType

export type WorkType = $Enums.WorkType

export const WorkType: typeof $Enums.WorkType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AppFiles
 * const appFiles = await prisma.appFile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AppFiles
   * const appFiles = await prisma.appFile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.appFile`: Exposes CRUD operations for the **AppFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppFiles
    * const appFiles = await prisma.appFile.findMany()
    * ```
    */
  get appFile(): Prisma.AppFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reading`: Exposes CRUD operations for the **Reading** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Readings
    * const readings = await prisma.reading.findMany()
    * ```
    */
  get reading(): Prisma.ReadingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.readingAuthor`: Exposes CRUD operations for the **ReadingAuthor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReadingAuthors
    * const readingAuthors = await prisma.readingAuthor.findMany()
    * ```
    */
  get readingAuthor(): Prisma.ReadingAuthorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.readingFeedback`: Exposes CRUD operations for the **ReadingFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReadingFeedbacks
    * const readingFeedbacks = await prisma.readingFeedback.findMany()
    * ```
    */
  get readingFeedback(): Prisma.ReadingFeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.readingManuscript`: Exposes CRUD operations for the **ReadingManuscript** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReadingManuscripts
    * const readingManuscripts = await prisma.readingManuscript.findMany()
    * ```
    */
  get readingManuscript(): Prisma.ReadingManuscriptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupAddress`: Exposes CRUD operations for the **GroupAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupAddresses
    * const groupAddresses = await prisma.groupAddress.findMany()
    * ```
    */
  get groupAddress(): Prisma.GroupAddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupNews`: Exposes CRUD operations for the **GroupNews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupNews
    * const groupNews = await prisma.groupNews.findMany()
    * ```
    */
  get groupNews(): Prisma.GroupNewsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupUser`: Exposes CRUD operations for the **GroupUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupUsers
    * const groupUsers = await prisma.groupUser.findMany()
    * ```
    */
  get groupUser(): Prisma.GroupUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupUrl`: Exposes CRUD operations for the **GroupUrl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupUrls
    * const groupUrls = await prisma.groupUrl.findMany()
    * ```
    */
  get groupUrl(): Prisma.GroupUrlDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userUrl`: Exposes CRUD operations for the **UserUrl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserUrls
    * const userUrls = await prisma.userUrl.findMany()
    * ```
    */
  get userUrl(): Prisma.UserUrlDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AppFile: 'AppFile',
    Reading: 'Reading',
    ReadingAuthor: 'ReadingAuthor',
    ReadingFeedback: 'ReadingFeedback',
    ReadingManuscript: 'ReadingManuscript',
    Group: 'Group',
    GroupAddress: 'GroupAddress',
    GroupNews: 'GroupNews',
    GroupUser: 'GroupUser',
    GroupUrl: 'GroupUrl',
    User: 'User',
    UserProfile: 'UserProfile',
    UserUrl: 'UserUrl'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "appFile" | "reading" | "readingAuthor" | "readingFeedback" | "readingManuscript" | "group" | "groupAddress" | "groupNews" | "groupUser" | "groupUrl" | "user" | "userProfile" | "userUrl"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AppFile: {
        payload: Prisma.$AppFilePayload<ExtArgs>
        fields: Prisma.AppFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>
          }
          findFirst: {
            args: Prisma.AppFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>
          }
          findMany: {
            args: Prisma.AppFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>[]
          }
          create: {
            args: Prisma.AppFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>
          }
          createMany: {
            args: Prisma.AppFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>[]
          }
          delete: {
            args: Prisma.AppFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>
          }
          update: {
            args: Prisma.AppFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>
          }
          deleteMany: {
            args: Prisma.AppFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>[]
          }
          upsert: {
            args: Prisma.AppFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppFilePayload>
          }
          aggregate: {
            args: Prisma.AppFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppFile>
          }
          groupBy: {
            args: Prisma.AppFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppFileCountArgs<ExtArgs>
            result: $Utils.Optional<AppFileCountAggregateOutputType> | number
          }
        }
      }
      Reading: {
        payload: Prisma.$ReadingPayload<ExtArgs>
        fields: Prisma.ReadingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>
          }
          findFirst: {
            args: Prisma.ReadingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>
          }
          findMany: {
            args: Prisma.ReadingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>[]
          }
          create: {
            args: Prisma.ReadingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>
          }
          createMany: {
            args: Prisma.ReadingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReadingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>[]
          }
          delete: {
            args: Prisma.ReadingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>
          }
          update: {
            args: Prisma.ReadingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>
          }
          deleteMany: {
            args: Prisma.ReadingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReadingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReadingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>[]
          }
          upsert: {
            args: Prisma.ReadingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingPayload>
          }
          aggregate: {
            args: Prisma.ReadingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReading>
          }
          groupBy: {
            args: Prisma.ReadingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReadingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadingCountArgs<ExtArgs>
            result: $Utils.Optional<ReadingCountAggregateOutputType> | number
          }
        }
      }
      ReadingAuthor: {
        payload: Prisma.$ReadingAuthorPayload<ExtArgs>
        fields: Prisma.ReadingAuthorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadingAuthorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadingAuthorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>
          }
          findFirst: {
            args: Prisma.ReadingAuthorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadingAuthorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>
          }
          findMany: {
            args: Prisma.ReadingAuthorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>[]
          }
          create: {
            args: Prisma.ReadingAuthorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>
          }
          createMany: {
            args: Prisma.ReadingAuthorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReadingAuthorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>[]
          }
          delete: {
            args: Prisma.ReadingAuthorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>
          }
          update: {
            args: Prisma.ReadingAuthorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>
          }
          deleteMany: {
            args: Prisma.ReadingAuthorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReadingAuthorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReadingAuthorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>[]
          }
          upsert: {
            args: Prisma.ReadingAuthorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingAuthorPayload>
          }
          aggregate: {
            args: Prisma.ReadingAuthorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReadingAuthor>
          }
          groupBy: {
            args: Prisma.ReadingAuthorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReadingAuthorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadingAuthorCountArgs<ExtArgs>
            result: $Utils.Optional<ReadingAuthorCountAggregateOutputType> | number
          }
        }
      }
      ReadingFeedback: {
        payload: Prisma.$ReadingFeedbackPayload<ExtArgs>
        fields: Prisma.ReadingFeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadingFeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadingFeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>
          }
          findFirst: {
            args: Prisma.ReadingFeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadingFeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>
          }
          findMany: {
            args: Prisma.ReadingFeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>[]
          }
          create: {
            args: Prisma.ReadingFeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>
          }
          createMany: {
            args: Prisma.ReadingFeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReadingFeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>[]
          }
          delete: {
            args: Prisma.ReadingFeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>
          }
          update: {
            args: Prisma.ReadingFeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>
          }
          deleteMany: {
            args: Prisma.ReadingFeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReadingFeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReadingFeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>[]
          }
          upsert: {
            args: Prisma.ReadingFeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingFeedbackPayload>
          }
          aggregate: {
            args: Prisma.ReadingFeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReadingFeedback>
          }
          groupBy: {
            args: Prisma.ReadingFeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReadingFeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadingFeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<ReadingFeedbackCountAggregateOutputType> | number
          }
        }
      }
      ReadingManuscript: {
        payload: Prisma.$ReadingManuscriptPayload<ExtArgs>
        fields: Prisma.ReadingManuscriptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadingManuscriptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadingManuscriptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>
          }
          findFirst: {
            args: Prisma.ReadingManuscriptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadingManuscriptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>
          }
          findMany: {
            args: Prisma.ReadingManuscriptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>[]
          }
          create: {
            args: Prisma.ReadingManuscriptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>
          }
          createMany: {
            args: Prisma.ReadingManuscriptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReadingManuscriptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>[]
          }
          delete: {
            args: Prisma.ReadingManuscriptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>
          }
          update: {
            args: Prisma.ReadingManuscriptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>
          }
          deleteMany: {
            args: Prisma.ReadingManuscriptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReadingManuscriptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReadingManuscriptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>[]
          }
          upsert: {
            args: Prisma.ReadingManuscriptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadingManuscriptPayload>
          }
          aggregate: {
            args: Prisma.ReadingManuscriptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReadingManuscript>
          }
          groupBy: {
            args: Prisma.ReadingManuscriptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReadingManuscriptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadingManuscriptCountArgs<ExtArgs>
            result: $Utils.Optional<ReadingManuscriptCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      GroupAddress: {
        payload: Prisma.$GroupAddressPayload<ExtArgs>
        fields: Prisma.GroupAddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupAddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupAddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>
          }
          findFirst: {
            args: Prisma.GroupAddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupAddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>
          }
          findMany: {
            args: Prisma.GroupAddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>[]
          }
          create: {
            args: Prisma.GroupAddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>
          }
          createMany: {
            args: Prisma.GroupAddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupAddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>[]
          }
          delete: {
            args: Prisma.GroupAddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>
          }
          update: {
            args: Prisma.GroupAddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>
          }
          deleteMany: {
            args: Prisma.GroupAddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupAddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupAddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>[]
          }
          upsert: {
            args: Prisma.GroupAddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupAddressPayload>
          }
          aggregate: {
            args: Prisma.GroupAddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupAddress>
          }
          groupBy: {
            args: Prisma.GroupAddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupAddressCountArgs<ExtArgs>
            result: $Utils.Optional<GroupAddressCountAggregateOutputType> | number
          }
        }
      }
      GroupNews: {
        payload: Prisma.$GroupNewsPayload<ExtArgs>
        fields: Prisma.GroupNewsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupNewsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupNewsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>
          }
          findFirst: {
            args: Prisma.GroupNewsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupNewsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>
          }
          findMany: {
            args: Prisma.GroupNewsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>[]
          }
          create: {
            args: Prisma.GroupNewsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>
          }
          createMany: {
            args: Prisma.GroupNewsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupNewsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>[]
          }
          delete: {
            args: Prisma.GroupNewsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>
          }
          update: {
            args: Prisma.GroupNewsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>
          }
          deleteMany: {
            args: Prisma.GroupNewsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupNewsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupNewsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>[]
          }
          upsert: {
            args: Prisma.GroupNewsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupNewsPayload>
          }
          aggregate: {
            args: Prisma.GroupNewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupNews>
          }
          groupBy: {
            args: Prisma.GroupNewsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupNewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupNewsCountArgs<ExtArgs>
            result: $Utils.Optional<GroupNewsCountAggregateOutputType> | number
          }
        }
      }
      GroupUser: {
        payload: Prisma.$GroupUserPayload<ExtArgs>
        fields: Prisma.GroupUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          findFirst: {
            args: Prisma.GroupUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          findMany: {
            args: Prisma.GroupUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>[]
          }
          create: {
            args: Prisma.GroupUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          createMany: {
            args: Prisma.GroupUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>[]
          }
          delete: {
            args: Prisma.GroupUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          update: {
            args: Prisma.GroupUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          deleteMany: {
            args: Prisma.GroupUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>[]
          }
          upsert: {
            args: Prisma.GroupUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          aggregate: {
            args: Prisma.GroupUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupUser>
          }
          groupBy: {
            args: Prisma.GroupUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupUserCountArgs<ExtArgs>
            result: $Utils.Optional<GroupUserCountAggregateOutputType> | number
          }
        }
      }
      GroupUrl: {
        payload: Prisma.$GroupUrlPayload<ExtArgs>
        fields: Prisma.GroupUrlFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupUrlFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupUrlFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>
          }
          findFirst: {
            args: Prisma.GroupUrlFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupUrlFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>
          }
          findMany: {
            args: Prisma.GroupUrlFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>[]
          }
          create: {
            args: Prisma.GroupUrlCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>
          }
          createMany: {
            args: Prisma.GroupUrlCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupUrlCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>[]
          }
          delete: {
            args: Prisma.GroupUrlDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>
          }
          update: {
            args: Prisma.GroupUrlUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>
          }
          deleteMany: {
            args: Prisma.GroupUrlDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUrlUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUrlUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>[]
          }
          upsert: {
            args: Prisma.GroupUrlUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUrlPayload>
          }
          aggregate: {
            args: Prisma.GroupUrlAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupUrl>
          }
          groupBy: {
            args: Prisma.GroupUrlGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupUrlGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupUrlCountArgs<ExtArgs>
            result: $Utils.Optional<GroupUrlCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      UserUrl: {
        payload: Prisma.$UserUrlPayload<ExtArgs>
        fields: Prisma.UserUrlFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserUrlFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserUrlFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>
          }
          findFirst: {
            args: Prisma.UserUrlFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserUrlFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>
          }
          findMany: {
            args: Prisma.UserUrlFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>[]
          }
          create: {
            args: Prisma.UserUrlCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>
          }
          createMany: {
            args: Prisma.UserUrlCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserUrlCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>[]
          }
          delete: {
            args: Prisma.UserUrlDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>
          }
          update: {
            args: Prisma.UserUrlUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>
          }
          deleteMany: {
            args: Prisma.UserUrlDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUrlUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUrlUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>[]
          }
          upsert: {
            args: Prisma.UserUrlUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserUrlPayload>
          }
          aggregate: {
            args: Prisma.UserUrlAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserUrl>
          }
          groupBy: {
            args: Prisma.UserUrlGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserUrlGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserUrlCountArgs<ExtArgs>
            result: $Utils.Optional<UserUrlCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    appFile?: AppFileOmit
    reading?: ReadingOmit
    readingAuthor?: ReadingAuthorOmit
    readingFeedback?: ReadingFeedbackOmit
    readingManuscript?: ReadingManuscriptOmit
    group?: GroupOmit
    groupAddress?: GroupAddressOmit
    groupNews?: GroupNewsOmit
    groupUser?: GroupUserOmit
    groupUrl?: GroupUrlOmit
    user?: UserOmit
    userProfile?: UserProfileOmit
    userUrl?: UserUrlOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
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
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AppFileCountOutputType
   */

  export type AppFileCountOutputType = {
    readingManuscripts: number
    readingFeedback: number
  }

  export type AppFileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readingManuscripts?: boolean | AppFileCountOutputTypeCountReadingManuscriptsArgs
    readingFeedback?: boolean | AppFileCountOutputTypeCountReadingFeedbackArgs
  }

  // Custom InputTypes
  /**
   * AppFileCountOutputType without action
   */
  export type AppFileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFileCountOutputType
     */
    select?: AppFileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppFileCountOutputType without action
   */
  export type AppFileCountOutputTypeCountReadingManuscriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingManuscriptWhereInput
  }

  /**
   * AppFileCountOutputType without action
   */
  export type AppFileCountOutputTypeCountReadingFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingFeedbackWhereInput
  }


  /**
   * Count Type ReadingCountOutputType
   */

  export type ReadingCountOutputType = {
    readingAuthor: number
  }

  export type ReadingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readingAuthor?: boolean | ReadingCountOutputTypeCountReadingAuthorArgs
  }

  // Custom InputTypes
  /**
   * ReadingCountOutputType without action
   */
  export type ReadingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingCountOutputType
     */
    select?: ReadingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReadingCountOutputType without action
   */
  export type ReadingCountOutputTypeCountReadingAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingAuthorWhereInput
  }


  /**
   * Count Type ReadingAuthorCountOutputType
   */

  export type ReadingAuthorCountOutputType = {
    readingManuscript: number
  }

  export type ReadingAuthorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readingManuscript?: boolean | ReadingAuthorCountOutputTypeCountReadingManuscriptArgs
  }

  // Custom InputTypes
  /**
   * ReadingAuthorCountOutputType without action
   */
  export type ReadingAuthorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthorCountOutputType
     */
    select?: ReadingAuthorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReadingAuthorCountOutputType without action
   */
  export type ReadingAuthorCountOutputTypeCountReadingManuscriptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingManuscriptWhereInput
  }


  /**
   * Count Type ReadingManuscriptCountOutputType
   */

  export type ReadingManuscriptCountOutputType = {
    readingFeedback: number
  }

  export type ReadingManuscriptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readingFeedback?: boolean | ReadingManuscriptCountOutputTypeCountReadingFeedbackArgs
  }

  // Custom InputTypes
  /**
   * ReadingManuscriptCountOutputType without action
   */
  export type ReadingManuscriptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscriptCountOutputType
     */
    select?: ReadingManuscriptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReadingManuscriptCountOutputType without action
   */
  export type ReadingManuscriptCountOutputTypeCountReadingFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingFeedbackWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    groupAddress: number
    groupUser: number
    groupNews: number
    reading: number
    groupUrl: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupAddress?: boolean | GroupCountOutputTypeCountGroupAddressArgs
    groupUser?: boolean | GroupCountOutputTypeCountGroupUserArgs
    groupNews?: boolean | GroupCountOutputTypeCountGroupNewsArgs
    reading?: boolean | GroupCountOutputTypeCountReadingArgs
    groupUrl?: boolean | GroupCountOutputTypeCountGroupUrlArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountGroupAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupAddressWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountGroupUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUserWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountGroupNewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupNewsWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountReadingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountGroupUrlArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUrlWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    groupUser: number
    group: number
    reading: number
    appFiles: number
    urls: number
    readingAuthor: number
    readingFeedback: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupUser?: boolean | UserCountOutputTypeCountGroupUserArgs
    group?: boolean | UserCountOutputTypeCountGroupArgs
    reading?: boolean | UserCountOutputTypeCountReadingArgs
    appFiles?: boolean | UserCountOutputTypeCountAppFilesArgs
    urls?: boolean | UserCountOutputTypeCountUrlsArgs
    readingAuthor?: boolean | UserCountOutputTypeCountReadingAuthorArgs
    readingFeedback?: boolean | UserCountOutputTypeCountReadingFeedbackArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReadingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppFileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUrlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserUrlWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReadingAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingAuthorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReadingFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingFeedbackWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AppFile
   */

  export type AggregateAppFile = {
    _count: AppFileCountAggregateOutputType | null
    _avg: AppFileAvgAggregateOutputType | null
    _sum: AppFileSumAggregateOutputType | null
    _min: AppFileMinAggregateOutputType | null
    _max: AppFileMaxAggregateOutputType | null
  }

  export type AppFileAvgAggregateOutputType = {
    wordCount: number | null
    pageCount: number | null
  }

  export type AppFileSumAggregateOutputType = {
    wordCount: number | null
    pageCount: number | null
  }

  export type AppFileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    filename: string | null
    documentType: $Enums.DocumentType | null
    mimetype: $Enums.FileType | null
    url: string | null
    uploadedAt: Date | null
    workType: $Enums.WorkType | null
    wordCount: number | null
    pageCount: number | null
    genre: $Enums.Genre | null
    manuscriptIsVisible: boolean | null
  }

  export type AppFileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    filename: string | null
    documentType: $Enums.DocumentType | null
    mimetype: $Enums.FileType | null
    url: string | null
    uploadedAt: Date | null
    workType: $Enums.WorkType | null
    wordCount: number | null
    pageCount: number | null
    genre: $Enums.Genre | null
    manuscriptIsVisible: boolean | null
  }

  export type AppFileCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    filename: number
    documentType: number
    mimetype: number
    url: number
    uploadedAt: number
    workType: number
    wordCount: number
    pageCount: number
    genre: number
    manuscriptIsVisible: number
    _all: number
  }


  export type AppFileAvgAggregateInputType = {
    wordCount?: true
    pageCount?: true
  }

  export type AppFileSumAggregateInputType = {
    wordCount?: true
    pageCount?: true
  }

  export type AppFileMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    filename?: true
    documentType?: true
    mimetype?: true
    url?: true
    uploadedAt?: true
    workType?: true
    wordCount?: true
    pageCount?: true
    genre?: true
    manuscriptIsVisible?: true
  }

  export type AppFileMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    filename?: true
    documentType?: true
    mimetype?: true
    url?: true
    uploadedAt?: true
    workType?: true
    wordCount?: true
    pageCount?: true
    genre?: true
    manuscriptIsVisible?: true
  }

  export type AppFileCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    filename?: true
    documentType?: true
    mimetype?: true
    url?: true
    uploadedAt?: true
    workType?: true
    wordCount?: true
    pageCount?: true
    genre?: true
    manuscriptIsVisible?: true
    _all?: true
  }

  export type AppFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppFile to aggregate.
     */
    where?: AppFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppFiles to fetch.
     */
    orderBy?: AppFileOrderByWithRelationInput | AppFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppFiles
    **/
    _count?: true | AppFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppFileMaxAggregateInputType
  }

  export type GetAppFileAggregateType<T extends AppFileAggregateArgs> = {
        [P in keyof T & keyof AggregateAppFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppFile[P]>
      : GetScalarType<T[P], AggregateAppFile[P]>
  }




  export type AppFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppFileWhereInput
    orderBy?: AppFileOrderByWithAggregationInput | AppFileOrderByWithAggregationInput[]
    by: AppFileScalarFieldEnum[] | AppFileScalarFieldEnum
    having?: AppFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppFileCountAggregateInputType | true
    _avg?: AppFileAvgAggregateInputType
    _sum?: AppFileSumAggregateInputType
    _min?: AppFileMinAggregateInputType
    _max?: AppFileMaxAggregateInputType
  }

  export type AppFileGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string | null
    filename: string
    documentType: $Enums.DocumentType
    mimetype: $Enums.FileType
    url: string
    uploadedAt: Date
    workType: $Enums.WorkType | null
    wordCount: number | null
    pageCount: number | null
    genre: $Enums.Genre | null
    manuscriptIsVisible: boolean
    _count: AppFileCountAggregateOutputType | null
    _avg: AppFileAvgAggregateOutputType | null
    _sum: AppFileSumAggregateOutputType | null
    _min: AppFileMinAggregateOutputType | null
    _max: AppFileMaxAggregateOutputType | null
  }

  type GetAppFileGroupByPayload<T extends AppFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppFileGroupByOutputType[P]>
            : GetScalarType<T[P], AppFileGroupByOutputType[P]>
        }
      >
    >


  export type AppFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    filename?: boolean
    documentType?: boolean
    mimetype?: boolean
    url?: boolean
    uploadedAt?: boolean
    workType?: boolean
    wordCount?: boolean
    pageCount?: boolean
    genre?: boolean
    manuscriptIsVisible?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscripts?: boolean | AppFile$readingManuscriptsArgs<ExtArgs>
    readingFeedback?: boolean | AppFile$readingFeedbackArgs<ExtArgs>
    _count?: boolean | AppFileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appFile"]>

  export type AppFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    filename?: boolean
    documentType?: boolean
    mimetype?: boolean
    url?: boolean
    uploadedAt?: boolean
    workType?: boolean
    wordCount?: boolean
    pageCount?: boolean
    genre?: boolean
    manuscriptIsVisible?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appFile"]>

  export type AppFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    filename?: boolean
    documentType?: boolean
    mimetype?: boolean
    url?: boolean
    uploadedAt?: boolean
    workType?: boolean
    wordCount?: boolean
    pageCount?: boolean
    genre?: boolean
    manuscriptIsVisible?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appFile"]>

  export type AppFileSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    filename?: boolean
    documentType?: boolean
    mimetype?: boolean
    url?: boolean
    uploadedAt?: boolean
    workType?: boolean
    wordCount?: boolean
    pageCount?: boolean
    genre?: boolean
    manuscriptIsVisible?: boolean
  }

  export type AppFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "filename" | "documentType" | "mimetype" | "url" | "uploadedAt" | "workType" | "wordCount" | "pageCount" | "genre" | "manuscriptIsVisible", ExtArgs["result"]["appFile"]>
  export type AppFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscripts?: boolean | AppFile$readingManuscriptsArgs<ExtArgs>
    readingFeedback?: boolean | AppFile$readingFeedbackArgs<ExtArgs>
    _count?: boolean | AppFileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AppFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AppFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppFile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      readingManuscripts: Prisma.$ReadingManuscriptPayload<ExtArgs>[]
      readingFeedback: Prisma.$ReadingFeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string | null
      filename: string
      documentType: $Enums.DocumentType
      mimetype: $Enums.FileType
      url: string
      uploadedAt: Date
      workType: $Enums.WorkType | null
      wordCount: number | null
      pageCount: number | null
      genre: $Enums.Genre | null
      manuscriptIsVisible: boolean
    }, ExtArgs["result"]["appFile"]>
    composites: {}
  }

  type AppFileGetPayload<S extends boolean | null | undefined | AppFileDefaultArgs> = $Result.GetResult<Prisma.$AppFilePayload, S>

  type AppFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppFileCountAggregateInputType | true
    }

  export interface AppFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppFile'], meta: { name: 'AppFile' } }
    /**
     * Find zero or one AppFile that matches the filter.
     * @param {AppFileFindUniqueArgs} args - Arguments to find a AppFile
     * @example
     * // Get one AppFile
     * const appFile = await prisma.appFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppFileFindUniqueArgs>(args: SelectSubset<T, AppFileFindUniqueArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppFileFindUniqueOrThrowArgs} args - Arguments to find a AppFile
     * @example
     * // Get one AppFile
     * const appFile = await prisma.appFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppFileFindUniqueOrThrowArgs>(args: SelectSubset<T, AppFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFileFindFirstArgs} args - Arguments to find a AppFile
     * @example
     * // Get one AppFile
     * const appFile = await prisma.appFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppFileFindFirstArgs>(args?: SelectSubset<T, AppFileFindFirstArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFileFindFirstOrThrowArgs} args - Arguments to find a AppFile
     * @example
     * // Get one AppFile
     * const appFile = await prisma.appFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppFileFindFirstOrThrowArgs>(args?: SelectSubset<T, AppFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppFiles
     * const appFiles = await prisma.appFile.findMany()
     * 
     * // Get first 10 AppFiles
     * const appFiles = await prisma.appFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appFileWithIdOnly = await prisma.appFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppFileFindManyArgs>(args?: SelectSubset<T, AppFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppFile.
     * @param {AppFileCreateArgs} args - Arguments to create a AppFile.
     * @example
     * // Create one AppFile
     * const AppFile = await prisma.appFile.create({
     *   data: {
     *     // ... data to create a AppFile
     *   }
     * })
     * 
     */
    create<T extends AppFileCreateArgs>(args: SelectSubset<T, AppFileCreateArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppFiles.
     * @param {AppFileCreateManyArgs} args - Arguments to create many AppFiles.
     * @example
     * // Create many AppFiles
     * const appFile = await prisma.appFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppFileCreateManyArgs>(args?: SelectSubset<T, AppFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppFiles and returns the data saved in the database.
     * @param {AppFileCreateManyAndReturnArgs} args - Arguments to create many AppFiles.
     * @example
     * // Create many AppFiles
     * const appFile = await prisma.appFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppFiles and only return the `id`
     * const appFileWithIdOnly = await prisma.appFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppFileCreateManyAndReturnArgs>(args?: SelectSubset<T, AppFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppFile.
     * @param {AppFileDeleteArgs} args - Arguments to delete one AppFile.
     * @example
     * // Delete one AppFile
     * const AppFile = await prisma.appFile.delete({
     *   where: {
     *     // ... filter to delete one AppFile
     *   }
     * })
     * 
     */
    delete<T extends AppFileDeleteArgs>(args: SelectSubset<T, AppFileDeleteArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppFile.
     * @param {AppFileUpdateArgs} args - Arguments to update one AppFile.
     * @example
     * // Update one AppFile
     * const appFile = await prisma.appFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppFileUpdateArgs>(args: SelectSubset<T, AppFileUpdateArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppFiles.
     * @param {AppFileDeleteManyArgs} args - Arguments to filter AppFiles to delete.
     * @example
     * // Delete a few AppFiles
     * const { count } = await prisma.appFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppFileDeleteManyArgs>(args?: SelectSubset<T, AppFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppFiles
     * const appFile = await prisma.appFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppFileUpdateManyArgs>(args: SelectSubset<T, AppFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppFiles and returns the data updated in the database.
     * @param {AppFileUpdateManyAndReturnArgs} args - Arguments to update many AppFiles.
     * @example
     * // Update many AppFiles
     * const appFile = await prisma.appFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppFiles and only return the `id`
     * const appFileWithIdOnly = await prisma.appFile.updateManyAndReturn({
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
    updateManyAndReturn<T extends AppFileUpdateManyAndReturnArgs>(args: SelectSubset<T, AppFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppFile.
     * @param {AppFileUpsertArgs} args - Arguments to update or create a AppFile.
     * @example
     * // Update or create a AppFile
     * const appFile = await prisma.appFile.upsert({
     *   create: {
     *     // ... data to create a AppFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppFile we want to update
     *   }
     * })
     */
    upsert<T extends AppFileUpsertArgs>(args: SelectSubset<T, AppFileUpsertArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFileCountArgs} args - Arguments to filter AppFiles to count.
     * @example
     * // Count the number of AppFiles
     * const count = await prisma.appFile.count({
     *   where: {
     *     // ... the filter for the AppFiles we want to count
     *   }
     * })
    **/
    count<T extends AppFileCountArgs>(
      args?: Subset<T, AppFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppFileAggregateArgs>(args: Subset<T, AppFileAggregateArgs>): Prisma.PrismaPromise<GetAppFileAggregateType<T>>

    /**
     * Group by AppFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFileGroupByArgs} args - Group by arguments.
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
      T extends AppFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppFileGroupByArgs['orderBy'] }
        : { orderBy?: AppFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppFile model
   */
  readonly fields: AppFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readingManuscripts<T extends AppFile$readingManuscriptsArgs<ExtArgs> = {}>(args?: Subset<T, AppFile$readingManuscriptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    readingFeedback<T extends AppFile$readingFeedbackArgs<ExtArgs> = {}>(args?: Subset<T, AppFile$readingFeedbackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppFile model
   */
  interface AppFileFieldRefs {
    readonly id: FieldRef<"AppFile", 'String'>
    readonly userId: FieldRef<"AppFile", 'String'>
    readonly title: FieldRef<"AppFile", 'String'>
    readonly description: FieldRef<"AppFile", 'String'>
    readonly filename: FieldRef<"AppFile", 'String'>
    readonly documentType: FieldRef<"AppFile", 'DocumentType'>
    readonly mimetype: FieldRef<"AppFile", 'FileType'>
    readonly url: FieldRef<"AppFile", 'String'>
    readonly uploadedAt: FieldRef<"AppFile", 'DateTime'>
    readonly workType: FieldRef<"AppFile", 'WorkType'>
    readonly wordCount: FieldRef<"AppFile", 'Int'>
    readonly pageCount: FieldRef<"AppFile", 'Int'>
    readonly genre: FieldRef<"AppFile", 'Genre'>
    readonly manuscriptIsVisible: FieldRef<"AppFile", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AppFile findUnique
   */
  export type AppFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * Filter, which AppFile to fetch.
     */
    where: AppFileWhereUniqueInput
  }

  /**
   * AppFile findUniqueOrThrow
   */
  export type AppFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * Filter, which AppFile to fetch.
     */
    where: AppFileWhereUniqueInput
  }

  /**
   * AppFile findFirst
   */
  export type AppFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * Filter, which AppFile to fetch.
     */
    where?: AppFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppFiles to fetch.
     */
    orderBy?: AppFileOrderByWithRelationInput | AppFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppFiles.
     */
    cursor?: AppFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppFiles.
     */
    distinct?: AppFileScalarFieldEnum | AppFileScalarFieldEnum[]
  }

  /**
   * AppFile findFirstOrThrow
   */
  export type AppFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * Filter, which AppFile to fetch.
     */
    where?: AppFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppFiles to fetch.
     */
    orderBy?: AppFileOrderByWithRelationInput | AppFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppFiles.
     */
    cursor?: AppFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppFiles.
     */
    distinct?: AppFileScalarFieldEnum | AppFileScalarFieldEnum[]
  }

  /**
   * AppFile findMany
   */
  export type AppFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * Filter, which AppFiles to fetch.
     */
    where?: AppFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppFiles to fetch.
     */
    orderBy?: AppFileOrderByWithRelationInput | AppFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppFiles.
     */
    cursor?: AppFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppFiles.
     */
    skip?: number
    distinct?: AppFileScalarFieldEnum | AppFileScalarFieldEnum[]
  }

  /**
   * AppFile create
   */
  export type AppFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * The data needed to create a AppFile.
     */
    data: XOR<AppFileCreateInput, AppFileUncheckedCreateInput>
  }

  /**
   * AppFile createMany
   */
  export type AppFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppFiles.
     */
    data: AppFileCreateManyInput | AppFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppFile createManyAndReturn
   */
  export type AppFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * The data used to create many AppFiles.
     */
    data: AppFileCreateManyInput | AppFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppFile update
   */
  export type AppFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * The data needed to update a AppFile.
     */
    data: XOR<AppFileUpdateInput, AppFileUncheckedUpdateInput>
    /**
     * Choose, which AppFile to update.
     */
    where: AppFileWhereUniqueInput
  }

  /**
   * AppFile updateMany
   */
  export type AppFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppFiles.
     */
    data: XOR<AppFileUpdateManyMutationInput, AppFileUncheckedUpdateManyInput>
    /**
     * Filter which AppFiles to update
     */
    where?: AppFileWhereInput
    /**
     * Limit how many AppFiles to update.
     */
    limit?: number
  }

  /**
   * AppFile updateManyAndReturn
   */
  export type AppFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * The data used to update AppFiles.
     */
    data: XOR<AppFileUpdateManyMutationInput, AppFileUncheckedUpdateManyInput>
    /**
     * Filter which AppFiles to update
     */
    where?: AppFileWhereInput
    /**
     * Limit how many AppFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppFile upsert
   */
  export type AppFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * The filter to search for the AppFile to update in case it exists.
     */
    where: AppFileWhereUniqueInput
    /**
     * In case the AppFile found by the `where` argument doesn't exist, create a new AppFile with this data.
     */
    create: XOR<AppFileCreateInput, AppFileUncheckedCreateInput>
    /**
     * In case the AppFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppFileUpdateInput, AppFileUncheckedUpdateInput>
  }

  /**
   * AppFile delete
   */
  export type AppFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    /**
     * Filter which AppFile to delete.
     */
    where: AppFileWhereUniqueInput
  }

  /**
   * AppFile deleteMany
   */
  export type AppFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppFiles to delete
     */
    where?: AppFileWhereInput
    /**
     * Limit how many AppFiles to delete.
     */
    limit?: number
  }

  /**
   * AppFile.readingManuscripts
   */
  export type AppFile$readingManuscriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    where?: ReadingManuscriptWhereInput
    orderBy?: ReadingManuscriptOrderByWithRelationInput | ReadingManuscriptOrderByWithRelationInput[]
    cursor?: ReadingManuscriptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingManuscriptScalarFieldEnum | ReadingManuscriptScalarFieldEnum[]
  }

  /**
   * AppFile.readingFeedback
   */
  export type AppFile$readingFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    where?: ReadingFeedbackWhereInput
    orderBy?: ReadingFeedbackOrderByWithRelationInput | ReadingFeedbackOrderByWithRelationInput[]
    cursor?: ReadingFeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingFeedbackScalarFieldEnum | ReadingFeedbackScalarFieldEnum[]
  }

  /**
   * AppFile without action
   */
  export type AppFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
  }


  /**
   * Model Reading
   */

  export type AggregateReading = {
    _count: ReadingCountAggregateOutputType | null
    _avg: ReadingAvgAggregateOutputType | null
    _sum: ReadingSumAggregateOutputType | null
    _min: ReadingMinAggregateOutputType | null
    _max: ReadingMaxAggregateOutputType | null
  }

  export type ReadingAvgAggregateOutputType = {
    minDaysBetweenReads: number | null
    maxConsecutiveReads: number | null
  }

  export type ReadingSumAggregateOutputType = {
    minDaysBetweenReads: number | null
    maxConsecutiveReads: number | null
  }

  export type ReadingMinAggregateOutputType = {
    id: string | null
    name: string | null
    groupId: string | null
    createdAt: Date | null
    createdUserId: string | null
    readingDate: Date | null
    readingStartTime: string | null
    readingEndTime: string | null
    readingAddressId: string | null
    submissionDeadline: Date | null
    description: string | null
    minDaysBetweenReads: number | null
    maxConsecutiveReads: number | null
  }

  export type ReadingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    groupId: string | null
    createdAt: Date | null
    createdUserId: string | null
    readingDate: Date | null
    readingStartTime: string | null
    readingEndTime: string | null
    readingAddressId: string | null
    submissionDeadline: Date | null
    description: string | null
    minDaysBetweenReads: number | null
    maxConsecutiveReads: number | null
  }

  export type ReadingCountAggregateOutputType = {
    id: number
    name: number
    groupId: number
    createdAt: number
    createdUserId: number
    readingDate: number
    readingStartTime: number
    readingEndTime: number
    readingAddressId: number
    submissionDeadline: number
    description: number
    minDaysBetweenReads: number
    maxConsecutiveReads: number
    _all: number
  }


  export type ReadingAvgAggregateInputType = {
    minDaysBetweenReads?: true
    maxConsecutiveReads?: true
  }

  export type ReadingSumAggregateInputType = {
    minDaysBetweenReads?: true
    maxConsecutiveReads?: true
  }

  export type ReadingMinAggregateInputType = {
    id?: true
    name?: true
    groupId?: true
    createdAt?: true
    createdUserId?: true
    readingDate?: true
    readingStartTime?: true
    readingEndTime?: true
    readingAddressId?: true
    submissionDeadline?: true
    description?: true
    minDaysBetweenReads?: true
    maxConsecutiveReads?: true
  }

  export type ReadingMaxAggregateInputType = {
    id?: true
    name?: true
    groupId?: true
    createdAt?: true
    createdUserId?: true
    readingDate?: true
    readingStartTime?: true
    readingEndTime?: true
    readingAddressId?: true
    submissionDeadline?: true
    description?: true
    minDaysBetweenReads?: true
    maxConsecutiveReads?: true
  }

  export type ReadingCountAggregateInputType = {
    id?: true
    name?: true
    groupId?: true
    createdAt?: true
    createdUserId?: true
    readingDate?: true
    readingStartTime?: true
    readingEndTime?: true
    readingAddressId?: true
    submissionDeadline?: true
    description?: true
    minDaysBetweenReads?: true
    maxConsecutiveReads?: true
    _all?: true
  }

  export type ReadingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reading to aggregate.
     */
    where?: ReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Readings to fetch.
     */
    orderBy?: ReadingOrderByWithRelationInput | ReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Readings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Readings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Readings
    **/
    _count?: true | ReadingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReadingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReadingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadingMaxAggregateInputType
  }

  export type GetReadingAggregateType<T extends ReadingAggregateArgs> = {
        [P in keyof T & keyof AggregateReading]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReading[P]>
      : GetScalarType<T[P], AggregateReading[P]>
  }




  export type ReadingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingWhereInput
    orderBy?: ReadingOrderByWithAggregationInput | ReadingOrderByWithAggregationInput[]
    by: ReadingScalarFieldEnum[] | ReadingScalarFieldEnum
    having?: ReadingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadingCountAggregateInputType | true
    _avg?: ReadingAvgAggregateInputType
    _sum?: ReadingSumAggregateInputType
    _min?: ReadingMinAggregateInputType
    _max?: ReadingMaxAggregateInputType
  }

  export type ReadingGroupByOutputType = {
    id: string
    name: string
    groupId: string
    createdAt: Date
    createdUserId: string
    readingDate: Date
    readingStartTime: string
    readingEndTime: string
    readingAddressId: string | null
    submissionDeadline: Date
    description: string
    minDaysBetweenReads: number
    maxConsecutiveReads: number
    _count: ReadingCountAggregateOutputType | null
    _avg: ReadingAvgAggregateOutputType | null
    _sum: ReadingSumAggregateOutputType | null
    _min: ReadingMinAggregateOutputType | null
    _max: ReadingMaxAggregateOutputType | null
  }

  type GetReadingGroupByPayload<T extends ReadingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadingGroupByOutputType[P]>
            : GetScalarType<T[P], ReadingGroupByOutputType[P]>
        }
      >
    >


  export type ReadingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    groupId?: boolean
    createdAt?: boolean
    createdUserId?: boolean
    readingDate?: boolean
    readingStartTime?: boolean
    readingEndTime?: boolean
    readingAddressId?: boolean
    submissionDeadline?: boolean
    description?: boolean
    minDaysBetweenReads?: boolean
    maxConsecutiveReads?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingAuthor?: boolean | Reading$readingAuthorArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    groupAddress?: boolean | Reading$groupAddressArgs<ExtArgs>
    _count?: boolean | ReadingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reading"]>

  export type ReadingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    groupId?: boolean
    createdAt?: boolean
    createdUserId?: boolean
    readingDate?: boolean
    readingStartTime?: boolean
    readingEndTime?: boolean
    readingAddressId?: boolean
    submissionDeadline?: boolean
    description?: boolean
    minDaysBetweenReads?: boolean
    maxConsecutiveReads?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    groupAddress?: boolean | Reading$groupAddressArgs<ExtArgs>
  }, ExtArgs["result"]["reading"]>

  export type ReadingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    groupId?: boolean
    createdAt?: boolean
    createdUserId?: boolean
    readingDate?: boolean
    readingStartTime?: boolean
    readingEndTime?: boolean
    readingAddressId?: boolean
    submissionDeadline?: boolean
    description?: boolean
    minDaysBetweenReads?: boolean
    maxConsecutiveReads?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    groupAddress?: boolean | Reading$groupAddressArgs<ExtArgs>
  }, ExtArgs["result"]["reading"]>

  export type ReadingSelectScalar = {
    id?: boolean
    name?: boolean
    groupId?: boolean
    createdAt?: boolean
    createdUserId?: boolean
    readingDate?: boolean
    readingStartTime?: boolean
    readingEndTime?: boolean
    readingAddressId?: boolean
    submissionDeadline?: boolean
    description?: boolean
    minDaysBetweenReads?: boolean
    maxConsecutiveReads?: boolean
  }

  export type ReadingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "groupId" | "createdAt" | "createdUserId" | "readingDate" | "readingStartTime" | "readingEndTime" | "readingAddressId" | "submissionDeadline" | "description" | "minDaysBetweenReads" | "maxConsecutiveReads", ExtArgs["result"]["reading"]>
  export type ReadingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingAuthor?: boolean | Reading$readingAuthorArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    groupAddress?: boolean | Reading$groupAddressArgs<ExtArgs>
    _count?: boolean | ReadingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReadingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    groupAddress?: boolean | Reading$groupAddressArgs<ExtArgs>
  }
  export type ReadingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    groupAddress?: boolean | Reading$groupAddressArgs<ExtArgs>
  }

  export type $ReadingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reading"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      readingAuthor: Prisma.$ReadingAuthorPayload<ExtArgs>[]
      group: Prisma.$GroupPayload<ExtArgs>
      groupAddress: Prisma.$GroupAddressPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      groupId: string
      createdAt: Date
      createdUserId: string
      readingDate: Date
      readingStartTime: string
      readingEndTime: string
      readingAddressId: string | null
      submissionDeadline: Date
      description: string
      minDaysBetweenReads: number
      maxConsecutiveReads: number
    }, ExtArgs["result"]["reading"]>
    composites: {}
  }

  type ReadingGetPayload<S extends boolean | null | undefined | ReadingDefaultArgs> = $Result.GetResult<Prisma.$ReadingPayload, S>

  type ReadingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReadingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReadingCountAggregateInputType | true
    }

  export interface ReadingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reading'], meta: { name: 'Reading' } }
    /**
     * Find zero or one Reading that matches the filter.
     * @param {ReadingFindUniqueArgs} args - Arguments to find a Reading
     * @example
     * // Get one Reading
     * const reading = await prisma.reading.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReadingFindUniqueArgs>(args: SelectSubset<T, ReadingFindUniqueArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reading that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReadingFindUniqueOrThrowArgs} args - Arguments to find a Reading
     * @example
     * // Get one Reading
     * const reading = await prisma.reading.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReadingFindUniqueOrThrowArgs>(args: SelectSubset<T, ReadingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reading that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFindFirstArgs} args - Arguments to find a Reading
     * @example
     * // Get one Reading
     * const reading = await prisma.reading.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReadingFindFirstArgs>(args?: SelectSubset<T, ReadingFindFirstArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reading that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFindFirstOrThrowArgs} args - Arguments to find a Reading
     * @example
     * // Get one Reading
     * const reading = await prisma.reading.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReadingFindFirstOrThrowArgs>(args?: SelectSubset<T, ReadingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Readings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Readings
     * const readings = await prisma.reading.findMany()
     * 
     * // Get first 10 Readings
     * const readings = await prisma.reading.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readingWithIdOnly = await prisma.reading.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReadingFindManyArgs>(args?: SelectSubset<T, ReadingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reading.
     * @param {ReadingCreateArgs} args - Arguments to create a Reading.
     * @example
     * // Create one Reading
     * const Reading = await prisma.reading.create({
     *   data: {
     *     // ... data to create a Reading
     *   }
     * })
     * 
     */
    create<T extends ReadingCreateArgs>(args: SelectSubset<T, ReadingCreateArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Readings.
     * @param {ReadingCreateManyArgs} args - Arguments to create many Readings.
     * @example
     * // Create many Readings
     * const reading = await prisma.reading.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReadingCreateManyArgs>(args?: SelectSubset<T, ReadingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Readings and returns the data saved in the database.
     * @param {ReadingCreateManyAndReturnArgs} args - Arguments to create many Readings.
     * @example
     * // Create many Readings
     * const reading = await prisma.reading.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Readings and only return the `id`
     * const readingWithIdOnly = await prisma.reading.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReadingCreateManyAndReturnArgs>(args?: SelectSubset<T, ReadingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reading.
     * @param {ReadingDeleteArgs} args - Arguments to delete one Reading.
     * @example
     * // Delete one Reading
     * const Reading = await prisma.reading.delete({
     *   where: {
     *     // ... filter to delete one Reading
     *   }
     * })
     * 
     */
    delete<T extends ReadingDeleteArgs>(args: SelectSubset<T, ReadingDeleteArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reading.
     * @param {ReadingUpdateArgs} args - Arguments to update one Reading.
     * @example
     * // Update one Reading
     * const reading = await prisma.reading.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReadingUpdateArgs>(args: SelectSubset<T, ReadingUpdateArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Readings.
     * @param {ReadingDeleteManyArgs} args - Arguments to filter Readings to delete.
     * @example
     * // Delete a few Readings
     * const { count } = await prisma.reading.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReadingDeleteManyArgs>(args?: SelectSubset<T, ReadingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Readings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Readings
     * const reading = await prisma.reading.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReadingUpdateManyArgs>(args: SelectSubset<T, ReadingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Readings and returns the data updated in the database.
     * @param {ReadingUpdateManyAndReturnArgs} args - Arguments to update many Readings.
     * @example
     * // Update many Readings
     * const reading = await prisma.reading.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Readings and only return the `id`
     * const readingWithIdOnly = await prisma.reading.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReadingUpdateManyAndReturnArgs>(args: SelectSubset<T, ReadingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reading.
     * @param {ReadingUpsertArgs} args - Arguments to update or create a Reading.
     * @example
     * // Update or create a Reading
     * const reading = await prisma.reading.upsert({
     *   create: {
     *     // ... data to create a Reading
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reading we want to update
     *   }
     * })
     */
    upsert<T extends ReadingUpsertArgs>(args: SelectSubset<T, ReadingUpsertArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Readings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingCountArgs} args - Arguments to filter Readings to count.
     * @example
     * // Count the number of Readings
     * const count = await prisma.reading.count({
     *   where: {
     *     // ... the filter for the Readings we want to count
     *   }
     * })
    **/
    count<T extends ReadingCountArgs>(
      args?: Subset<T, ReadingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReadingAggregateArgs>(args: Subset<T, ReadingAggregateArgs>): Prisma.PrismaPromise<GetReadingAggregateType<T>>

    /**
     * Group by Reading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingGroupByArgs} args - Group by arguments.
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
      T extends ReadingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadingGroupByArgs['orderBy'] }
        : { orderBy?: ReadingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReadingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reading model
   */
  readonly fields: ReadingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reading.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readingAuthor<T extends Reading$readingAuthorArgs<ExtArgs> = {}>(args?: Subset<T, Reading$readingAuthorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    groupAddress<T extends Reading$groupAddressArgs<ExtArgs> = {}>(args?: Subset<T, Reading$groupAddressArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reading model
   */
  interface ReadingFieldRefs {
    readonly id: FieldRef<"Reading", 'String'>
    readonly name: FieldRef<"Reading", 'String'>
    readonly groupId: FieldRef<"Reading", 'String'>
    readonly createdAt: FieldRef<"Reading", 'DateTime'>
    readonly createdUserId: FieldRef<"Reading", 'String'>
    readonly readingDate: FieldRef<"Reading", 'DateTime'>
    readonly readingStartTime: FieldRef<"Reading", 'String'>
    readonly readingEndTime: FieldRef<"Reading", 'String'>
    readonly readingAddressId: FieldRef<"Reading", 'String'>
    readonly submissionDeadline: FieldRef<"Reading", 'DateTime'>
    readonly description: FieldRef<"Reading", 'String'>
    readonly minDaysBetweenReads: FieldRef<"Reading", 'Int'>
    readonly maxConsecutiveReads: FieldRef<"Reading", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Reading findUnique
   */
  export type ReadingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * Filter, which Reading to fetch.
     */
    where: ReadingWhereUniqueInput
  }

  /**
   * Reading findUniqueOrThrow
   */
  export type ReadingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * Filter, which Reading to fetch.
     */
    where: ReadingWhereUniqueInput
  }

  /**
   * Reading findFirst
   */
  export type ReadingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * Filter, which Reading to fetch.
     */
    where?: ReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Readings to fetch.
     */
    orderBy?: ReadingOrderByWithRelationInput | ReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Readings.
     */
    cursor?: ReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Readings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Readings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Readings.
     */
    distinct?: ReadingScalarFieldEnum | ReadingScalarFieldEnum[]
  }

  /**
   * Reading findFirstOrThrow
   */
  export type ReadingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * Filter, which Reading to fetch.
     */
    where?: ReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Readings to fetch.
     */
    orderBy?: ReadingOrderByWithRelationInput | ReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Readings.
     */
    cursor?: ReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Readings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Readings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Readings.
     */
    distinct?: ReadingScalarFieldEnum | ReadingScalarFieldEnum[]
  }

  /**
   * Reading findMany
   */
  export type ReadingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * Filter, which Readings to fetch.
     */
    where?: ReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Readings to fetch.
     */
    orderBy?: ReadingOrderByWithRelationInput | ReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Readings.
     */
    cursor?: ReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Readings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Readings.
     */
    skip?: number
    distinct?: ReadingScalarFieldEnum | ReadingScalarFieldEnum[]
  }

  /**
   * Reading create
   */
  export type ReadingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * The data needed to create a Reading.
     */
    data: XOR<ReadingCreateInput, ReadingUncheckedCreateInput>
  }

  /**
   * Reading createMany
   */
  export type ReadingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Readings.
     */
    data: ReadingCreateManyInput | ReadingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reading createManyAndReturn
   */
  export type ReadingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * The data used to create many Readings.
     */
    data: ReadingCreateManyInput | ReadingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reading update
   */
  export type ReadingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * The data needed to update a Reading.
     */
    data: XOR<ReadingUpdateInput, ReadingUncheckedUpdateInput>
    /**
     * Choose, which Reading to update.
     */
    where: ReadingWhereUniqueInput
  }

  /**
   * Reading updateMany
   */
  export type ReadingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Readings.
     */
    data: XOR<ReadingUpdateManyMutationInput, ReadingUncheckedUpdateManyInput>
    /**
     * Filter which Readings to update
     */
    where?: ReadingWhereInput
    /**
     * Limit how many Readings to update.
     */
    limit?: number
  }

  /**
   * Reading updateManyAndReturn
   */
  export type ReadingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * The data used to update Readings.
     */
    data: XOR<ReadingUpdateManyMutationInput, ReadingUncheckedUpdateManyInput>
    /**
     * Filter which Readings to update
     */
    where?: ReadingWhereInput
    /**
     * Limit how many Readings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reading upsert
   */
  export type ReadingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * The filter to search for the Reading to update in case it exists.
     */
    where: ReadingWhereUniqueInput
    /**
     * In case the Reading found by the `where` argument doesn't exist, create a new Reading with this data.
     */
    create: XOR<ReadingCreateInput, ReadingUncheckedCreateInput>
    /**
     * In case the Reading was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadingUpdateInput, ReadingUncheckedUpdateInput>
  }

  /**
   * Reading delete
   */
  export type ReadingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    /**
     * Filter which Reading to delete.
     */
    where: ReadingWhereUniqueInput
  }

  /**
   * Reading deleteMany
   */
  export type ReadingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Readings to delete
     */
    where?: ReadingWhereInput
    /**
     * Limit how many Readings to delete.
     */
    limit?: number
  }

  /**
   * Reading.readingAuthor
   */
  export type Reading$readingAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    where?: ReadingAuthorWhereInput
    orderBy?: ReadingAuthorOrderByWithRelationInput | ReadingAuthorOrderByWithRelationInput[]
    cursor?: ReadingAuthorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingAuthorScalarFieldEnum | ReadingAuthorScalarFieldEnum[]
  }

  /**
   * Reading.groupAddress
   */
  export type Reading$groupAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    where?: GroupAddressWhereInput
  }

  /**
   * Reading without action
   */
  export type ReadingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
  }


  /**
   * Model ReadingAuthor
   */

  export type AggregateReadingAuthor = {
    _count: ReadingAuthorCountAggregateOutputType | null
    _min: ReadingAuthorMinAggregateOutputType | null
    _max: ReadingAuthorMaxAggregateOutputType | null
  }

  export type ReadingAuthorMinAggregateOutputType = {
    id: string | null
    readingId: string | null
    authorId: string | null
    joinedAt: Date | null
  }

  export type ReadingAuthorMaxAggregateOutputType = {
    id: string | null
    readingId: string | null
    authorId: string | null
    joinedAt: Date | null
  }

  export type ReadingAuthorCountAggregateOutputType = {
    id: number
    readingId: number
    authorId: number
    joinedAt: number
    _all: number
  }


  export type ReadingAuthorMinAggregateInputType = {
    id?: true
    readingId?: true
    authorId?: true
    joinedAt?: true
  }

  export type ReadingAuthorMaxAggregateInputType = {
    id?: true
    readingId?: true
    authorId?: true
    joinedAt?: true
  }

  export type ReadingAuthorCountAggregateInputType = {
    id?: true
    readingId?: true
    authorId?: true
    joinedAt?: true
    _all?: true
  }

  export type ReadingAuthorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingAuthor to aggregate.
     */
    where?: ReadingAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingAuthors to fetch.
     */
    orderBy?: ReadingAuthorOrderByWithRelationInput | ReadingAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadingAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingAuthors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReadingAuthors
    **/
    _count?: true | ReadingAuthorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadingAuthorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadingAuthorMaxAggregateInputType
  }

  export type GetReadingAuthorAggregateType<T extends ReadingAuthorAggregateArgs> = {
        [P in keyof T & keyof AggregateReadingAuthor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReadingAuthor[P]>
      : GetScalarType<T[P], AggregateReadingAuthor[P]>
  }




  export type ReadingAuthorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingAuthorWhereInput
    orderBy?: ReadingAuthorOrderByWithAggregationInput | ReadingAuthorOrderByWithAggregationInput[]
    by: ReadingAuthorScalarFieldEnum[] | ReadingAuthorScalarFieldEnum
    having?: ReadingAuthorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadingAuthorCountAggregateInputType | true
    _min?: ReadingAuthorMinAggregateInputType
    _max?: ReadingAuthorMaxAggregateInputType
  }

  export type ReadingAuthorGroupByOutputType = {
    id: string
    readingId: string
    authorId: string
    joinedAt: Date
    _count: ReadingAuthorCountAggregateOutputType | null
    _min: ReadingAuthorMinAggregateOutputType | null
    _max: ReadingAuthorMaxAggregateOutputType | null
  }

  type GetReadingAuthorGroupByPayload<T extends ReadingAuthorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadingAuthorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadingAuthorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadingAuthorGroupByOutputType[P]>
            : GetScalarType<T[P], ReadingAuthorGroupByOutputType[P]>
        }
      >
    >


  export type ReadingAuthorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingId?: boolean
    authorId?: boolean
    joinedAt?: boolean
    reading?: boolean | ReadingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingAuthor$readingManuscriptArgs<ExtArgs>
    _count?: boolean | ReadingAuthorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingAuthor"]>

  export type ReadingAuthorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingId?: boolean
    authorId?: boolean
    joinedAt?: boolean
    reading?: boolean | ReadingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingAuthor"]>

  export type ReadingAuthorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingId?: boolean
    authorId?: boolean
    joinedAt?: boolean
    reading?: boolean | ReadingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingAuthor"]>

  export type ReadingAuthorSelectScalar = {
    id?: boolean
    readingId?: boolean
    authorId?: boolean
    joinedAt?: boolean
  }

  export type ReadingAuthorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "readingId" | "authorId" | "joinedAt", ExtArgs["result"]["readingAuthor"]>
  export type ReadingAuthorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reading?: boolean | ReadingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingAuthor$readingManuscriptArgs<ExtArgs>
    _count?: boolean | ReadingAuthorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReadingAuthorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reading?: boolean | ReadingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReadingAuthorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reading?: boolean | ReadingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReadingAuthorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReadingAuthor"
    objects: {
      reading: Prisma.$ReadingPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      readingManuscript: Prisma.$ReadingManuscriptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      readingId: string
      authorId: string
      joinedAt: Date
    }, ExtArgs["result"]["readingAuthor"]>
    composites: {}
  }

  type ReadingAuthorGetPayload<S extends boolean | null | undefined | ReadingAuthorDefaultArgs> = $Result.GetResult<Prisma.$ReadingAuthorPayload, S>

  type ReadingAuthorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReadingAuthorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReadingAuthorCountAggregateInputType | true
    }

  export interface ReadingAuthorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReadingAuthor'], meta: { name: 'ReadingAuthor' } }
    /**
     * Find zero or one ReadingAuthor that matches the filter.
     * @param {ReadingAuthorFindUniqueArgs} args - Arguments to find a ReadingAuthor
     * @example
     * // Get one ReadingAuthor
     * const readingAuthor = await prisma.readingAuthor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReadingAuthorFindUniqueArgs>(args: SelectSubset<T, ReadingAuthorFindUniqueArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReadingAuthor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReadingAuthorFindUniqueOrThrowArgs} args - Arguments to find a ReadingAuthor
     * @example
     * // Get one ReadingAuthor
     * const readingAuthor = await prisma.readingAuthor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReadingAuthorFindUniqueOrThrowArgs>(args: SelectSubset<T, ReadingAuthorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadingAuthor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAuthorFindFirstArgs} args - Arguments to find a ReadingAuthor
     * @example
     * // Get one ReadingAuthor
     * const readingAuthor = await prisma.readingAuthor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReadingAuthorFindFirstArgs>(args?: SelectSubset<T, ReadingAuthorFindFirstArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadingAuthor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAuthorFindFirstOrThrowArgs} args - Arguments to find a ReadingAuthor
     * @example
     * // Get one ReadingAuthor
     * const readingAuthor = await prisma.readingAuthor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReadingAuthorFindFirstOrThrowArgs>(args?: SelectSubset<T, ReadingAuthorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReadingAuthors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAuthorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReadingAuthors
     * const readingAuthors = await prisma.readingAuthor.findMany()
     * 
     * // Get first 10 ReadingAuthors
     * const readingAuthors = await prisma.readingAuthor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readingAuthorWithIdOnly = await prisma.readingAuthor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReadingAuthorFindManyArgs>(args?: SelectSubset<T, ReadingAuthorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReadingAuthor.
     * @param {ReadingAuthorCreateArgs} args - Arguments to create a ReadingAuthor.
     * @example
     * // Create one ReadingAuthor
     * const ReadingAuthor = await prisma.readingAuthor.create({
     *   data: {
     *     // ... data to create a ReadingAuthor
     *   }
     * })
     * 
     */
    create<T extends ReadingAuthorCreateArgs>(args: SelectSubset<T, ReadingAuthorCreateArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReadingAuthors.
     * @param {ReadingAuthorCreateManyArgs} args - Arguments to create many ReadingAuthors.
     * @example
     * // Create many ReadingAuthors
     * const readingAuthor = await prisma.readingAuthor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReadingAuthorCreateManyArgs>(args?: SelectSubset<T, ReadingAuthorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReadingAuthors and returns the data saved in the database.
     * @param {ReadingAuthorCreateManyAndReturnArgs} args - Arguments to create many ReadingAuthors.
     * @example
     * // Create many ReadingAuthors
     * const readingAuthor = await prisma.readingAuthor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReadingAuthors and only return the `id`
     * const readingAuthorWithIdOnly = await prisma.readingAuthor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReadingAuthorCreateManyAndReturnArgs>(args?: SelectSubset<T, ReadingAuthorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReadingAuthor.
     * @param {ReadingAuthorDeleteArgs} args - Arguments to delete one ReadingAuthor.
     * @example
     * // Delete one ReadingAuthor
     * const ReadingAuthor = await prisma.readingAuthor.delete({
     *   where: {
     *     // ... filter to delete one ReadingAuthor
     *   }
     * })
     * 
     */
    delete<T extends ReadingAuthorDeleteArgs>(args: SelectSubset<T, ReadingAuthorDeleteArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReadingAuthor.
     * @param {ReadingAuthorUpdateArgs} args - Arguments to update one ReadingAuthor.
     * @example
     * // Update one ReadingAuthor
     * const readingAuthor = await prisma.readingAuthor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReadingAuthorUpdateArgs>(args: SelectSubset<T, ReadingAuthorUpdateArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReadingAuthors.
     * @param {ReadingAuthorDeleteManyArgs} args - Arguments to filter ReadingAuthors to delete.
     * @example
     * // Delete a few ReadingAuthors
     * const { count } = await prisma.readingAuthor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReadingAuthorDeleteManyArgs>(args?: SelectSubset<T, ReadingAuthorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingAuthors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAuthorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReadingAuthors
     * const readingAuthor = await prisma.readingAuthor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReadingAuthorUpdateManyArgs>(args: SelectSubset<T, ReadingAuthorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingAuthors and returns the data updated in the database.
     * @param {ReadingAuthorUpdateManyAndReturnArgs} args - Arguments to update many ReadingAuthors.
     * @example
     * // Update many ReadingAuthors
     * const readingAuthor = await prisma.readingAuthor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReadingAuthors and only return the `id`
     * const readingAuthorWithIdOnly = await prisma.readingAuthor.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReadingAuthorUpdateManyAndReturnArgs>(args: SelectSubset<T, ReadingAuthorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReadingAuthor.
     * @param {ReadingAuthorUpsertArgs} args - Arguments to update or create a ReadingAuthor.
     * @example
     * // Update or create a ReadingAuthor
     * const readingAuthor = await prisma.readingAuthor.upsert({
     *   create: {
     *     // ... data to create a ReadingAuthor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReadingAuthor we want to update
     *   }
     * })
     */
    upsert<T extends ReadingAuthorUpsertArgs>(args: SelectSubset<T, ReadingAuthorUpsertArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReadingAuthors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAuthorCountArgs} args - Arguments to filter ReadingAuthors to count.
     * @example
     * // Count the number of ReadingAuthors
     * const count = await prisma.readingAuthor.count({
     *   where: {
     *     // ... the filter for the ReadingAuthors we want to count
     *   }
     * })
    **/
    count<T extends ReadingAuthorCountArgs>(
      args?: Subset<T, ReadingAuthorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadingAuthorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReadingAuthor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAuthorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReadingAuthorAggregateArgs>(args: Subset<T, ReadingAuthorAggregateArgs>): Prisma.PrismaPromise<GetReadingAuthorAggregateType<T>>

    /**
     * Group by ReadingAuthor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingAuthorGroupByArgs} args - Group by arguments.
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
      T extends ReadingAuthorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadingAuthorGroupByArgs['orderBy'] }
        : { orderBy?: ReadingAuthorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReadingAuthorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadingAuthorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReadingAuthor model
   */
  readonly fields: ReadingAuthorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReadingAuthor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadingAuthorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reading<T extends ReadingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReadingDefaultArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readingManuscript<T extends ReadingAuthor$readingManuscriptArgs<ExtArgs> = {}>(args?: Subset<T, ReadingAuthor$readingManuscriptArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReadingAuthor model
   */
  interface ReadingAuthorFieldRefs {
    readonly id: FieldRef<"ReadingAuthor", 'String'>
    readonly readingId: FieldRef<"ReadingAuthor", 'String'>
    readonly authorId: FieldRef<"ReadingAuthor", 'String'>
    readonly joinedAt: FieldRef<"ReadingAuthor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReadingAuthor findUnique
   */
  export type ReadingAuthorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * Filter, which ReadingAuthor to fetch.
     */
    where: ReadingAuthorWhereUniqueInput
  }

  /**
   * ReadingAuthor findUniqueOrThrow
   */
  export type ReadingAuthorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * Filter, which ReadingAuthor to fetch.
     */
    where: ReadingAuthorWhereUniqueInput
  }

  /**
   * ReadingAuthor findFirst
   */
  export type ReadingAuthorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * Filter, which ReadingAuthor to fetch.
     */
    where?: ReadingAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingAuthors to fetch.
     */
    orderBy?: ReadingAuthorOrderByWithRelationInput | ReadingAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingAuthors.
     */
    cursor?: ReadingAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingAuthors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingAuthors.
     */
    distinct?: ReadingAuthorScalarFieldEnum | ReadingAuthorScalarFieldEnum[]
  }

  /**
   * ReadingAuthor findFirstOrThrow
   */
  export type ReadingAuthorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * Filter, which ReadingAuthor to fetch.
     */
    where?: ReadingAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingAuthors to fetch.
     */
    orderBy?: ReadingAuthorOrderByWithRelationInput | ReadingAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingAuthors.
     */
    cursor?: ReadingAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingAuthors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingAuthors.
     */
    distinct?: ReadingAuthorScalarFieldEnum | ReadingAuthorScalarFieldEnum[]
  }

  /**
   * ReadingAuthor findMany
   */
  export type ReadingAuthorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * Filter, which ReadingAuthors to fetch.
     */
    where?: ReadingAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingAuthors to fetch.
     */
    orderBy?: ReadingAuthorOrderByWithRelationInput | ReadingAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReadingAuthors.
     */
    cursor?: ReadingAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingAuthors.
     */
    skip?: number
    distinct?: ReadingAuthorScalarFieldEnum | ReadingAuthorScalarFieldEnum[]
  }

  /**
   * ReadingAuthor create
   */
  export type ReadingAuthorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * The data needed to create a ReadingAuthor.
     */
    data: XOR<ReadingAuthorCreateInput, ReadingAuthorUncheckedCreateInput>
  }

  /**
   * ReadingAuthor createMany
   */
  export type ReadingAuthorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReadingAuthors.
     */
    data: ReadingAuthorCreateManyInput | ReadingAuthorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadingAuthor createManyAndReturn
   */
  export type ReadingAuthorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * The data used to create many ReadingAuthors.
     */
    data: ReadingAuthorCreateManyInput | ReadingAuthorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadingAuthor update
   */
  export type ReadingAuthorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * The data needed to update a ReadingAuthor.
     */
    data: XOR<ReadingAuthorUpdateInput, ReadingAuthorUncheckedUpdateInput>
    /**
     * Choose, which ReadingAuthor to update.
     */
    where: ReadingAuthorWhereUniqueInput
  }

  /**
   * ReadingAuthor updateMany
   */
  export type ReadingAuthorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReadingAuthors.
     */
    data: XOR<ReadingAuthorUpdateManyMutationInput, ReadingAuthorUncheckedUpdateManyInput>
    /**
     * Filter which ReadingAuthors to update
     */
    where?: ReadingAuthorWhereInput
    /**
     * Limit how many ReadingAuthors to update.
     */
    limit?: number
  }

  /**
   * ReadingAuthor updateManyAndReturn
   */
  export type ReadingAuthorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * The data used to update ReadingAuthors.
     */
    data: XOR<ReadingAuthorUpdateManyMutationInput, ReadingAuthorUncheckedUpdateManyInput>
    /**
     * Filter which ReadingAuthors to update
     */
    where?: ReadingAuthorWhereInput
    /**
     * Limit how many ReadingAuthors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadingAuthor upsert
   */
  export type ReadingAuthorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * The filter to search for the ReadingAuthor to update in case it exists.
     */
    where: ReadingAuthorWhereUniqueInput
    /**
     * In case the ReadingAuthor found by the `where` argument doesn't exist, create a new ReadingAuthor with this data.
     */
    create: XOR<ReadingAuthorCreateInput, ReadingAuthorUncheckedCreateInput>
    /**
     * In case the ReadingAuthor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadingAuthorUpdateInput, ReadingAuthorUncheckedUpdateInput>
  }

  /**
   * ReadingAuthor delete
   */
  export type ReadingAuthorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    /**
     * Filter which ReadingAuthor to delete.
     */
    where: ReadingAuthorWhereUniqueInput
  }

  /**
   * ReadingAuthor deleteMany
   */
  export type ReadingAuthorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingAuthors to delete
     */
    where?: ReadingAuthorWhereInput
    /**
     * Limit how many ReadingAuthors to delete.
     */
    limit?: number
  }

  /**
   * ReadingAuthor.readingManuscript
   */
  export type ReadingAuthor$readingManuscriptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    where?: ReadingManuscriptWhereInput
    orderBy?: ReadingManuscriptOrderByWithRelationInput | ReadingManuscriptOrderByWithRelationInput[]
    cursor?: ReadingManuscriptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingManuscriptScalarFieldEnum | ReadingManuscriptScalarFieldEnum[]
  }

  /**
   * ReadingAuthor without action
   */
  export type ReadingAuthorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
  }


  /**
   * Model ReadingFeedback
   */

  export type AggregateReadingFeedback = {
    _count: ReadingFeedbackCountAggregateOutputType | null
    _min: ReadingFeedbackMinAggregateOutputType | null
    _max: ReadingFeedbackMaxAggregateOutputType | null
  }

  export type ReadingFeedbackMinAggregateOutputType = {
    id: string | null
    readingManuscriptId: string | null
    feedbackFileId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReadingFeedbackMaxAggregateOutputType = {
    id: string | null
    readingManuscriptId: string | null
    feedbackFileId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReadingFeedbackCountAggregateOutputType = {
    id: number
    readingManuscriptId: number
    feedbackFileId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReadingFeedbackMinAggregateInputType = {
    id?: true
    readingManuscriptId?: true
    feedbackFileId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReadingFeedbackMaxAggregateInputType = {
    id?: true
    readingManuscriptId?: true
    feedbackFileId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReadingFeedbackCountAggregateInputType = {
    id?: true
    readingManuscriptId?: true
    feedbackFileId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReadingFeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingFeedback to aggregate.
     */
    where?: ReadingFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingFeedbacks to fetch.
     */
    orderBy?: ReadingFeedbackOrderByWithRelationInput | ReadingFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadingFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReadingFeedbacks
    **/
    _count?: true | ReadingFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadingFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadingFeedbackMaxAggregateInputType
  }

  export type GetReadingFeedbackAggregateType<T extends ReadingFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateReadingFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReadingFeedback[P]>
      : GetScalarType<T[P], AggregateReadingFeedback[P]>
  }




  export type ReadingFeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingFeedbackWhereInput
    orderBy?: ReadingFeedbackOrderByWithAggregationInput | ReadingFeedbackOrderByWithAggregationInput[]
    by: ReadingFeedbackScalarFieldEnum[] | ReadingFeedbackScalarFieldEnum
    having?: ReadingFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadingFeedbackCountAggregateInputType | true
    _min?: ReadingFeedbackMinAggregateInputType
    _max?: ReadingFeedbackMaxAggregateInputType
  }

  export type ReadingFeedbackGroupByOutputType = {
    id: string
    readingManuscriptId: string
    feedbackFileId: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: ReadingFeedbackCountAggregateOutputType | null
    _min: ReadingFeedbackMinAggregateOutputType | null
    _max: ReadingFeedbackMaxAggregateOutputType | null
  }

  type GetReadingFeedbackGroupByPayload<T extends ReadingFeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadingFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadingFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadingFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], ReadingFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type ReadingFeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingManuscriptId?: boolean
    feedbackFileId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingManuscriptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingFeedback"]>

  export type ReadingFeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingManuscriptId?: boolean
    feedbackFileId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingManuscriptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingFeedback"]>

  export type ReadingFeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingManuscriptId?: boolean
    feedbackFileId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingManuscriptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingFeedback"]>

  export type ReadingFeedbackSelectScalar = {
    id?: boolean
    readingManuscriptId?: boolean
    feedbackFileId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReadingFeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "readingManuscriptId" | "feedbackFileId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["readingFeedback"]>
  export type ReadingFeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingManuscriptDefaultArgs<ExtArgs>
  }
  export type ReadingFeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingManuscriptDefaultArgs<ExtArgs>
  }
  export type ReadingFeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    readingManuscript?: boolean | ReadingManuscriptDefaultArgs<ExtArgs>
  }

  export type $ReadingFeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReadingFeedback"
    objects: {
      appFile: Prisma.$AppFilePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      readingManuscript: Prisma.$ReadingManuscriptPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      readingManuscriptId: string
      feedbackFileId: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["readingFeedback"]>
    composites: {}
  }

  type ReadingFeedbackGetPayload<S extends boolean | null | undefined | ReadingFeedbackDefaultArgs> = $Result.GetResult<Prisma.$ReadingFeedbackPayload, S>

  type ReadingFeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReadingFeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReadingFeedbackCountAggregateInputType | true
    }

  export interface ReadingFeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReadingFeedback'], meta: { name: 'ReadingFeedback' } }
    /**
     * Find zero or one ReadingFeedback that matches the filter.
     * @param {ReadingFeedbackFindUniqueArgs} args - Arguments to find a ReadingFeedback
     * @example
     * // Get one ReadingFeedback
     * const readingFeedback = await prisma.readingFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReadingFeedbackFindUniqueArgs>(args: SelectSubset<T, ReadingFeedbackFindUniqueArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReadingFeedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReadingFeedbackFindUniqueOrThrowArgs} args - Arguments to find a ReadingFeedback
     * @example
     * // Get one ReadingFeedback
     * const readingFeedback = await prisma.readingFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReadingFeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, ReadingFeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadingFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFeedbackFindFirstArgs} args - Arguments to find a ReadingFeedback
     * @example
     * // Get one ReadingFeedback
     * const readingFeedback = await prisma.readingFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReadingFeedbackFindFirstArgs>(args?: SelectSubset<T, ReadingFeedbackFindFirstArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadingFeedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFeedbackFindFirstOrThrowArgs} args - Arguments to find a ReadingFeedback
     * @example
     * // Get one ReadingFeedback
     * const readingFeedback = await prisma.readingFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReadingFeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, ReadingFeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReadingFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReadingFeedbacks
     * const readingFeedbacks = await prisma.readingFeedback.findMany()
     * 
     * // Get first 10 ReadingFeedbacks
     * const readingFeedbacks = await prisma.readingFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readingFeedbackWithIdOnly = await prisma.readingFeedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReadingFeedbackFindManyArgs>(args?: SelectSubset<T, ReadingFeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReadingFeedback.
     * @param {ReadingFeedbackCreateArgs} args - Arguments to create a ReadingFeedback.
     * @example
     * // Create one ReadingFeedback
     * const ReadingFeedback = await prisma.readingFeedback.create({
     *   data: {
     *     // ... data to create a ReadingFeedback
     *   }
     * })
     * 
     */
    create<T extends ReadingFeedbackCreateArgs>(args: SelectSubset<T, ReadingFeedbackCreateArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReadingFeedbacks.
     * @param {ReadingFeedbackCreateManyArgs} args - Arguments to create many ReadingFeedbacks.
     * @example
     * // Create many ReadingFeedbacks
     * const readingFeedback = await prisma.readingFeedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReadingFeedbackCreateManyArgs>(args?: SelectSubset<T, ReadingFeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReadingFeedbacks and returns the data saved in the database.
     * @param {ReadingFeedbackCreateManyAndReturnArgs} args - Arguments to create many ReadingFeedbacks.
     * @example
     * // Create many ReadingFeedbacks
     * const readingFeedback = await prisma.readingFeedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReadingFeedbacks and only return the `id`
     * const readingFeedbackWithIdOnly = await prisma.readingFeedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReadingFeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, ReadingFeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReadingFeedback.
     * @param {ReadingFeedbackDeleteArgs} args - Arguments to delete one ReadingFeedback.
     * @example
     * // Delete one ReadingFeedback
     * const ReadingFeedback = await prisma.readingFeedback.delete({
     *   where: {
     *     // ... filter to delete one ReadingFeedback
     *   }
     * })
     * 
     */
    delete<T extends ReadingFeedbackDeleteArgs>(args: SelectSubset<T, ReadingFeedbackDeleteArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReadingFeedback.
     * @param {ReadingFeedbackUpdateArgs} args - Arguments to update one ReadingFeedback.
     * @example
     * // Update one ReadingFeedback
     * const readingFeedback = await prisma.readingFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReadingFeedbackUpdateArgs>(args: SelectSubset<T, ReadingFeedbackUpdateArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReadingFeedbacks.
     * @param {ReadingFeedbackDeleteManyArgs} args - Arguments to filter ReadingFeedbacks to delete.
     * @example
     * // Delete a few ReadingFeedbacks
     * const { count } = await prisma.readingFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReadingFeedbackDeleteManyArgs>(args?: SelectSubset<T, ReadingFeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReadingFeedbacks
     * const readingFeedback = await prisma.readingFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReadingFeedbackUpdateManyArgs>(args: SelectSubset<T, ReadingFeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingFeedbacks and returns the data updated in the database.
     * @param {ReadingFeedbackUpdateManyAndReturnArgs} args - Arguments to update many ReadingFeedbacks.
     * @example
     * // Update many ReadingFeedbacks
     * const readingFeedback = await prisma.readingFeedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReadingFeedbacks and only return the `id`
     * const readingFeedbackWithIdOnly = await prisma.readingFeedback.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReadingFeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, ReadingFeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReadingFeedback.
     * @param {ReadingFeedbackUpsertArgs} args - Arguments to update or create a ReadingFeedback.
     * @example
     * // Update or create a ReadingFeedback
     * const readingFeedback = await prisma.readingFeedback.upsert({
     *   create: {
     *     // ... data to create a ReadingFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReadingFeedback we want to update
     *   }
     * })
     */
    upsert<T extends ReadingFeedbackUpsertArgs>(args: SelectSubset<T, ReadingFeedbackUpsertArgs<ExtArgs>>): Prisma__ReadingFeedbackClient<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReadingFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFeedbackCountArgs} args - Arguments to filter ReadingFeedbacks to count.
     * @example
     * // Count the number of ReadingFeedbacks
     * const count = await prisma.readingFeedback.count({
     *   where: {
     *     // ... the filter for the ReadingFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends ReadingFeedbackCountArgs>(
      args?: Subset<T, ReadingFeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadingFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReadingFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReadingFeedbackAggregateArgs>(args: Subset<T, ReadingFeedbackAggregateArgs>): Prisma.PrismaPromise<GetReadingFeedbackAggregateType<T>>

    /**
     * Group by ReadingFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingFeedbackGroupByArgs} args - Group by arguments.
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
      T extends ReadingFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadingFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: ReadingFeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReadingFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadingFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReadingFeedback model
   */
  readonly fields: ReadingFeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReadingFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadingFeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appFile<T extends AppFileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppFileDefaultArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readingManuscript<T extends ReadingManuscriptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReadingManuscriptDefaultArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReadingFeedback model
   */
  interface ReadingFeedbackFieldRefs {
    readonly id: FieldRef<"ReadingFeedback", 'String'>
    readonly readingManuscriptId: FieldRef<"ReadingFeedback", 'String'>
    readonly feedbackFileId: FieldRef<"ReadingFeedback", 'String'>
    readonly userId: FieldRef<"ReadingFeedback", 'String'>
    readonly createdAt: FieldRef<"ReadingFeedback", 'DateTime'>
    readonly updatedAt: FieldRef<"ReadingFeedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReadingFeedback findUnique
   */
  export type ReadingFeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ReadingFeedback to fetch.
     */
    where: ReadingFeedbackWhereUniqueInput
  }

  /**
   * ReadingFeedback findUniqueOrThrow
   */
  export type ReadingFeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ReadingFeedback to fetch.
     */
    where: ReadingFeedbackWhereUniqueInput
  }

  /**
   * ReadingFeedback findFirst
   */
  export type ReadingFeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ReadingFeedback to fetch.
     */
    where?: ReadingFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingFeedbacks to fetch.
     */
    orderBy?: ReadingFeedbackOrderByWithRelationInput | ReadingFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingFeedbacks.
     */
    cursor?: ReadingFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingFeedbacks.
     */
    distinct?: ReadingFeedbackScalarFieldEnum | ReadingFeedbackScalarFieldEnum[]
  }

  /**
   * ReadingFeedback findFirstOrThrow
   */
  export type ReadingFeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ReadingFeedback to fetch.
     */
    where?: ReadingFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingFeedbacks to fetch.
     */
    orderBy?: ReadingFeedbackOrderByWithRelationInput | ReadingFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingFeedbacks.
     */
    cursor?: ReadingFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingFeedbacks.
     */
    distinct?: ReadingFeedbackScalarFieldEnum | ReadingFeedbackScalarFieldEnum[]
  }

  /**
   * ReadingFeedback findMany
   */
  export type ReadingFeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ReadingFeedbacks to fetch.
     */
    where?: ReadingFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingFeedbacks to fetch.
     */
    orderBy?: ReadingFeedbackOrderByWithRelationInput | ReadingFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReadingFeedbacks.
     */
    cursor?: ReadingFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingFeedbacks.
     */
    skip?: number
    distinct?: ReadingFeedbackScalarFieldEnum | ReadingFeedbackScalarFieldEnum[]
  }

  /**
   * ReadingFeedback create
   */
  export type ReadingFeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a ReadingFeedback.
     */
    data: XOR<ReadingFeedbackCreateInput, ReadingFeedbackUncheckedCreateInput>
  }

  /**
   * ReadingFeedback createMany
   */
  export type ReadingFeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReadingFeedbacks.
     */
    data: ReadingFeedbackCreateManyInput | ReadingFeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadingFeedback createManyAndReturn
   */
  export type ReadingFeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many ReadingFeedbacks.
     */
    data: ReadingFeedbackCreateManyInput | ReadingFeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadingFeedback update
   */
  export type ReadingFeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a ReadingFeedback.
     */
    data: XOR<ReadingFeedbackUpdateInput, ReadingFeedbackUncheckedUpdateInput>
    /**
     * Choose, which ReadingFeedback to update.
     */
    where: ReadingFeedbackWhereUniqueInput
  }

  /**
   * ReadingFeedback updateMany
   */
  export type ReadingFeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReadingFeedbacks.
     */
    data: XOR<ReadingFeedbackUpdateManyMutationInput, ReadingFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which ReadingFeedbacks to update
     */
    where?: ReadingFeedbackWhereInput
    /**
     * Limit how many ReadingFeedbacks to update.
     */
    limit?: number
  }

  /**
   * ReadingFeedback updateManyAndReturn
   */
  export type ReadingFeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * The data used to update ReadingFeedbacks.
     */
    data: XOR<ReadingFeedbackUpdateManyMutationInput, ReadingFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which ReadingFeedbacks to update
     */
    where?: ReadingFeedbackWhereInput
    /**
     * Limit how many ReadingFeedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadingFeedback upsert
   */
  export type ReadingFeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the ReadingFeedback to update in case it exists.
     */
    where: ReadingFeedbackWhereUniqueInput
    /**
     * In case the ReadingFeedback found by the `where` argument doesn't exist, create a new ReadingFeedback with this data.
     */
    create: XOR<ReadingFeedbackCreateInput, ReadingFeedbackUncheckedCreateInput>
    /**
     * In case the ReadingFeedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadingFeedbackUpdateInput, ReadingFeedbackUncheckedUpdateInput>
  }

  /**
   * ReadingFeedback delete
   */
  export type ReadingFeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    /**
     * Filter which ReadingFeedback to delete.
     */
    where: ReadingFeedbackWhereUniqueInput
  }

  /**
   * ReadingFeedback deleteMany
   */
  export type ReadingFeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingFeedbacks to delete
     */
    where?: ReadingFeedbackWhereInput
    /**
     * Limit how many ReadingFeedbacks to delete.
     */
    limit?: number
  }

  /**
   * ReadingFeedback without action
   */
  export type ReadingFeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
  }


  /**
   * Model ReadingManuscript
   */

  export type AggregateReadingManuscript = {
    _count: ReadingManuscriptCountAggregateOutputType | null
    _min: ReadingManuscriptMinAggregateOutputType | null
    _max: ReadingManuscriptMaxAggregateOutputType | null
  }

  export type ReadingManuscriptMinAggregateOutputType = {
    id: string | null
    readingId: string | null
    readingAuthorId: string | null
    appFileId: string | null
  }

  export type ReadingManuscriptMaxAggregateOutputType = {
    id: string | null
    readingId: string | null
    readingAuthorId: string | null
    appFileId: string | null
  }

  export type ReadingManuscriptCountAggregateOutputType = {
    id: number
    readingId: number
    readingAuthorId: number
    appFileId: number
    _all: number
  }


  export type ReadingManuscriptMinAggregateInputType = {
    id?: true
    readingId?: true
    readingAuthorId?: true
    appFileId?: true
  }

  export type ReadingManuscriptMaxAggregateInputType = {
    id?: true
    readingId?: true
    readingAuthorId?: true
    appFileId?: true
  }

  export type ReadingManuscriptCountAggregateInputType = {
    id?: true
    readingId?: true
    readingAuthorId?: true
    appFileId?: true
    _all?: true
  }

  export type ReadingManuscriptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingManuscript to aggregate.
     */
    where?: ReadingManuscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingManuscripts to fetch.
     */
    orderBy?: ReadingManuscriptOrderByWithRelationInput | ReadingManuscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadingManuscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingManuscripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingManuscripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReadingManuscripts
    **/
    _count?: true | ReadingManuscriptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadingManuscriptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadingManuscriptMaxAggregateInputType
  }

  export type GetReadingManuscriptAggregateType<T extends ReadingManuscriptAggregateArgs> = {
        [P in keyof T & keyof AggregateReadingManuscript]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReadingManuscript[P]>
      : GetScalarType<T[P], AggregateReadingManuscript[P]>
  }




  export type ReadingManuscriptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadingManuscriptWhereInput
    orderBy?: ReadingManuscriptOrderByWithAggregationInput | ReadingManuscriptOrderByWithAggregationInput[]
    by: ReadingManuscriptScalarFieldEnum[] | ReadingManuscriptScalarFieldEnum
    having?: ReadingManuscriptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadingManuscriptCountAggregateInputType | true
    _min?: ReadingManuscriptMinAggregateInputType
    _max?: ReadingManuscriptMaxAggregateInputType
  }

  export type ReadingManuscriptGroupByOutputType = {
    id: string
    readingId: string
    readingAuthorId: string
    appFileId: string
    _count: ReadingManuscriptCountAggregateOutputType | null
    _min: ReadingManuscriptMinAggregateOutputType | null
    _max: ReadingManuscriptMaxAggregateOutputType | null
  }

  type GetReadingManuscriptGroupByPayload<T extends ReadingManuscriptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadingManuscriptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadingManuscriptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadingManuscriptGroupByOutputType[P]>
            : GetScalarType<T[P], ReadingManuscriptGroupByOutputType[P]>
        }
      >
    >


  export type ReadingManuscriptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingId?: boolean
    readingAuthorId?: boolean
    appFileId?: boolean
    readingFeedback?: boolean | ReadingManuscript$readingFeedbackArgs<ExtArgs>
    readingAuthor?: boolean | ReadingAuthorDefaultArgs<ExtArgs>
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    _count?: boolean | ReadingManuscriptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingManuscript"]>

  export type ReadingManuscriptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingId?: boolean
    readingAuthorId?: boolean
    appFileId?: boolean
    readingAuthor?: boolean | ReadingAuthorDefaultArgs<ExtArgs>
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingManuscript"]>

  export type ReadingManuscriptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readingId?: boolean
    readingAuthorId?: boolean
    appFileId?: boolean
    readingAuthor?: boolean | ReadingAuthorDefaultArgs<ExtArgs>
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["readingManuscript"]>

  export type ReadingManuscriptSelectScalar = {
    id?: boolean
    readingId?: boolean
    readingAuthorId?: boolean
    appFileId?: boolean
  }

  export type ReadingManuscriptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "readingId" | "readingAuthorId" | "appFileId", ExtArgs["result"]["readingManuscript"]>
  export type ReadingManuscriptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readingFeedback?: boolean | ReadingManuscript$readingFeedbackArgs<ExtArgs>
    readingAuthor?: boolean | ReadingAuthorDefaultArgs<ExtArgs>
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
    _count?: boolean | ReadingManuscriptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReadingManuscriptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readingAuthor?: boolean | ReadingAuthorDefaultArgs<ExtArgs>
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
  }
  export type ReadingManuscriptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readingAuthor?: boolean | ReadingAuthorDefaultArgs<ExtArgs>
    appFile?: boolean | AppFileDefaultArgs<ExtArgs>
  }

  export type $ReadingManuscriptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReadingManuscript"
    objects: {
      readingFeedback: Prisma.$ReadingFeedbackPayload<ExtArgs>[]
      readingAuthor: Prisma.$ReadingAuthorPayload<ExtArgs>
      appFile: Prisma.$AppFilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      readingId: string
      readingAuthorId: string
      appFileId: string
    }, ExtArgs["result"]["readingManuscript"]>
    composites: {}
  }

  type ReadingManuscriptGetPayload<S extends boolean | null | undefined | ReadingManuscriptDefaultArgs> = $Result.GetResult<Prisma.$ReadingManuscriptPayload, S>

  type ReadingManuscriptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReadingManuscriptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReadingManuscriptCountAggregateInputType | true
    }

  export interface ReadingManuscriptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReadingManuscript'], meta: { name: 'ReadingManuscript' } }
    /**
     * Find zero or one ReadingManuscript that matches the filter.
     * @param {ReadingManuscriptFindUniqueArgs} args - Arguments to find a ReadingManuscript
     * @example
     * // Get one ReadingManuscript
     * const readingManuscript = await prisma.readingManuscript.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReadingManuscriptFindUniqueArgs>(args: SelectSubset<T, ReadingManuscriptFindUniqueArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReadingManuscript that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReadingManuscriptFindUniqueOrThrowArgs} args - Arguments to find a ReadingManuscript
     * @example
     * // Get one ReadingManuscript
     * const readingManuscript = await prisma.readingManuscript.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReadingManuscriptFindUniqueOrThrowArgs>(args: SelectSubset<T, ReadingManuscriptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadingManuscript that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingManuscriptFindFirstArgs} args - Arguments to find a ReadingManuscript
     * @example
     * // Get one ReadingManuscript
     * const readingManuscript = await prisma.readingManuscript.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReadingManuscriptFindFirstArgs>(args?: SelectSubset<T, ReadingManuscriptFindFirstArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadingManuscript that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingManuscriptFindFirstOrThrowArgs} args - Arguments to find a ReadingManuscript
     * @example
     * // Get one ReadingManuscript
     * const readingManuscript = await prisma.readingManuscript.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReadingManuscriptFindFirstOrThrowArgs>(args?: SelectSubset<T, ReadingManuscriptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReadingManuscripts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingManuscriptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReadingManuscripts
     * const readingManuscripts = await prisma.readingManuscript.findMany()
     * 
     * // Get first 10 ReadingManuscripts
     * const readingManuscripts = await prisma.readingManuscript.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readingManuscriptWithIdOnly = await prisma.readingManuscript.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReadingManuscriptFindManyArgs>(args?: SelectSubset<T, ReadingManuscriptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReadingManuscript.
     * @param {ReadingManuscriptCreateArgs} args - Arguments to create a ReadingManuscript.
     * @example
     * // Create one ReadingManuscript
     * const ReadingManuscript = await prisma.readingManuscript.create({
     *   data: {
     *     // ... data to create a ReadingManuscript
     *   }
     * })
     * 
     */
    create<T extends ReadingManuscriptCreateArgs>(args: SelectSubset<T, ReadingManuscriptCreateArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReadingManuscripts.
     * @param {ReadingManuscriptCreateManyArgs} args - Arguments to create many ReadingManuscripts.
     * @example
     * // Create many ReadingManuscripts
     * const readingManuscript = await prisma.readingManuscript.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReadingManuscriptCreateManyArgs>(args?: SelectSubset<T, ReadingManuscriptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReadingManuscripts and returns the data saved in the database.
     * @param {ReadingManuscriptCreateManyAndReturnArgs} args - Arguments to create many ReadingManuscripts.
     * @example
     * // Create many ReadingManuscripts
     * const readingManuscript = await prisma.readingManuscript.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReadingManuscripts and only return the `id`
     * const readingManuscriptWithIdOnly = await prisma.readingManuscript.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReadingManuscriptCreateManyAndReturnArgs>(args?: SelectSubset<T, ReadingManuscriptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReadingManuscript.
     * @param {ReadingManuscriptDeleteArgs} args - Arguments to delete one ReadingManuscript.
     * @example
     * // Delete one ReadingManuscript
     * const ReadingManuscript = await prisma.readingManuscript.delete({
     *   where: {
     *     // ... filter to delete one ReadingManuscript
     *   }
     * })
     * 
     */
    delete<T extends ReadingManuscriptDeleteArgs>(args: SelectSubset<T, ReadingManuscriptDeleteArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReadingManuscript.
     * @param {ReadingManuscriptUpdateArgs} args - Arguments to update one ReadingManuscript.
     * @example
     * // Update one ReadingManuscript
     * const readingManuscript = await prisma.readingManuscript.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReadingManuscriptUpdateArgs>(args: SelectSubset<T, ReadingManuscriptUpdateArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReadingManuscripts.
     * @param {ReadingManuscriptDeleteManyArgs} args - Arguments to filter ReadingManuscripts to delete.
     * @example
     * // Delete a few ReadingManuscripts
     * const { count } = await prisma.readingManuscript.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReadingManuscriptDeleteManyArgs>(args?: SelectSubset<T, ReadingManuscriptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingManuscripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingManuscriptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReadingManuscripts
     * const readingManuscript = await prisma.readingManuscript.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReadingManuscriptUpdateManyArgs>(args: SelectSubset<T, ReadingManuscriptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadingManuscripts and returns the data updated in the database.
     * @param {ReadingManuscriptUpdateManyAndReturnArgs} args - Arguments to update many ReadingManuscripts.
     * @example
     * // Update many ReadingManuscripts
     * const readingManuscript = await prisma.readingManuscript.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReadingManuscripts and only return the `id`
     * const readingManuscriptWithIdOnly = await prisma.readingManuscript.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReadingManuscriptUpdateManyAndReturnArgs>(args: SelectSubset<T, ReadingManuscriptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReadingManuscript.
     * @param {ReadingManuscriptUpsertArgs} args - Arguments to update or create a ReadingManuscript.
     * @example
     * // Update or create a ReadingManuscript
     * const readingManuscript = await prisma.readingManuscript.upsert({
     *   create: {
     *     // ... data to create a ReadingManuscript
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReadingManuscript we want to update
     *   }
     * })
     */
    upsert<T extends ReadingManuscriptUpsertArgs>(args: SelectSubset<T, ReadingManuscriptUpsertArgs<ExtArgs>>): Prisma__ReadingManuscriptClient<$Result.GetResult<Prisma.$ReadingManuscriptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReadingManuscripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingManuscriptCountArgs} args - Arguments to filter ReadingManuscripts to count.
     * @example
     * // Count the number of ReadingManuscripts
     * const count = await prisma.readingManuscript.count({
     *   where: {
     *     // ... the filter for the ReadingManuscripts we want to count
     *   }
     * })
    **/
    count<T extends ReadingManuscriptCountArgs>(
      args?: Subset<T, ReadingManuscriptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadingManuscriptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReadingManuscript.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingManuscriptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReadingManuscriptAggregateArgs>(args: Subset<T, ReadingManuscriptAggregateArgs>): Prisma.PrismaPromise<GetReadingManuscriptAggregateType<T>>

    /**
     * Group by ReadingManuscript.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadingManuscriptGroupByArgs} args - Group by arguments.
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
      T extends ReadingManuscriptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadingManuscriptGroupByArgs['orderBy'] }
        : { orderBy?: ReadingManuscriptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReadingManuscriptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadingManuscriptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReadingManuscript model
   */
  readonly fields: ReadingManuscriptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReadingManuscript.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadingManuscriptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    readingFeedback<T extends ReadingManuscript$readingFeedbackArgs<ExtArgs> = {}>(args?: Subset<T, ReadingManuscript$readingFeedbackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    readingAuthor<T extends ReadingAuthorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReadingAuthorDefaultArgs<ExtArgs>>): Prisma__ReadingAuthorClient<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appFile<T extends AppFileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppFileDefaultArgs<ExtArgs>>): Prisma__AppFileClient<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReadingManuscript model
   */
  interface ReadingManuscriptFieldRefs {
    readonly id: FieldRef<"ReadingManuscript", 'String'>
    readonly readingId: FieldRef<"ReadingManuscript", 'String'>
    readonly readingAuthorId: FieldRef<"ReadingManuscript", 'String'>
    readonly appFileId: FieldRef<"ReadingManuscript", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ReadingManuscript findUnique
   */
  export type ReadingManuscriptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * Filter, which ReadingManuscript to fetch.
     */
    where: ReadingManuscriptWhereUniqueInput
  }

  /**
   * ReadingManuscript findUniqueOrThrow
   */
  export type ReadingManuscriptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * Filter, which ReadingManuscript to fetch.
     */
    where: ReadingManuscriptWhereUniqueInput
  }

  /**
   * ReadingManuscript findFirst
   */
  export type ReadingManuscriptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * Filter, which ReadingManuscript to fetch.
     */
    where?: ReadingManuscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingManuscripts to fetch.
     */
    orderBy?: ReadingManuscriptOrderByWithRelationInput | ReadingManuscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingManuscripts.
     */
    cursor?: ReadingManuscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingManuscripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingManuscripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingManuscripts.
     */
    distinct?: ReadingManuscriptScalarFieldEnum | ReadingManuscriptScalarFieldEnum[]
  }

  /**
   * ReadingManuscript findFirstOrThrow
   */
  export type ReadingManuscriptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * Filter, which ReadingManuscript to fetch.
     */
    where?: ReadingManuscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingManuscripts to fetch.
     */
    orderBy?: ReadingManuscriptOrderByWithRelationInput | ReadingManuscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadingManuscripts.
     */
    cursor?: ReadingManuscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingManuscripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingManuscripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadingManuscripts.
     */
    distinct?: ReadingManuscriptScalarFieldEnum | ReadingManuscriptScalarFieldEnum[]
  }

  /**
   * ReadingManuscript findMany
   */
  export type ReadingManuscriptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * Filter, which ReadingManuscripts to fetch.
     */
    where?: ReadingManuscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadingManuscripts to fetch.
     */
    orderBy?: ReadingManuscriptOrderByWithRelationInput | ReadingManuscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReadingManuscripts.
     */
    cursor?: ReadingManuscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadingManuscripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadingManuscripts.
     */
    skip?: number
    distinct?: ReadingManuscriptScalarFieldEnum | ReadingManuscriptScalarFieldEnum[]
  }

  /**
   * ReadingManuscript create
   */
  export type ReadingManuscriptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * The data needed to create a ReadingManuscript.
     */
    data: XOR<ReadingManuscriptCreateInput, ReadingManuscriptUncheckedCreateInput>
  }

  /**
   * ReadingManuscript createMany
   */
  export type ReadingManuscriptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReadingManuscripts.
     */
    data: ReadingManuscriptCreateManyInput | ReadingManuscriptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadingManuscript createManyAndReturn
   */
  export type ReadingManuscriptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * The data used to create many ReadingManuscripts.
     */
    data: ReadingManuscriptCreateManyInput | ReadingManuscriptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadingManuscript update
   */
  export type ReadingManuscriptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * The data needed to update a ReadingManuscript.
     */
    data: XOR<ReadingManuscriptUpdateInput, ReadingManuscriptUncheckedUpdateInput>
    /**
     * Choose, which ReadingManuscript to update.
     */
    where: ReadingManuscriptWhereUniqueInput
  }

  /**
   * ReadingManuscript updateMany
   */
  export type ReadingManuscriptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReadingManuscripts.
     */
    data: XOR<ReadingManuscriptUpdateManyMutationInput, ReadingManuscriptUncheckedUpdateManyInput>
    /**
     * Filter which ReadingManuscripts to update
     */
    where?: ReadingManuscriptWhereInput
    /**
     * Limit how many ReadingManuscripts to update.
     */
    limit?: number
  }

  /**
   * ReadingManuscript updateManyAndReturn
   */
  export type ReadingManuscriptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * The data used to update ReadingManuscripts.
     */
    data: XOR<ReadingManuscriptUpdateManyMutationInput, ReadingManuscriptUncheckedUpdateManyInput>
    /**
     * Filter which ReadingManuscripts to update
     */
    where?: ReadingManuscriptWhereInput
    /**
     * Limit how many ReadingManuscripts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadingManuscript upsert
   */
  export type ReadingManuscriptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * The filter to search for the ReadingManuscript to update in case it exists.
     */
    where: ReadingManuscriptWhereUniqueInput
    /**
     * In case the ReadingManuscript found by the `where` argument doesn't exist, create a new ReadingManuscript with this data.
     */
    create: XOR<ReadingManuscriptCreateInput, ReadingManuscriptUncheckedCreateInput>
    /**
     * In case the ReadingManuscript was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadingManuscriptUpdateInput, ReadingManuscriptUncheckedUpdateInput>
  }

  /**
   * ReadingManuscript delete
   */
  export type ReadingManuscriptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
    /**
     * Filter which ReadingManuscript to delete.
     */
    where: ReadingManuscriptWhereUniqueInput
  }

  /**
   * ReadingManuscript deleteMany
   */
  export type ReadingManuscriptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadingManuscripts to delete
     */
    where?: ReadingManuscriptWhereInput
    /**
     * Limit how many ReadingManuscripts to delete.
     */
    limit?: number
  }

  /**
   * ReadingManuscript.readingFeedback
   */
  export type ReadingManuscript$readingFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    where?: ReadingFeedbackWhereInput
    orderBy?: ReadingFeedbackOrderByWithRelationInput | ReadingFeedbackOrderByWithRelationInput[]
    cursor?: ReadingFeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingFeedbackScalarFieldEnum | ReadingFeedbackScalarFieldEnum[]
  }

  /**
   * ReadingManuscript without action
   */
  export type ReadingManuscriptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingManuscript
     */
    select?: ReadingManuscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingManuscript
     */
    omit?: ReadingManuscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingManuscriptInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    creatorUserId: string | null
    groupType: $Enums.GroupType | null
    name: string | null
    description: string | null
    imageUrl: string | null
    websiteUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    creatorUserId: string | null
    groupType: $Enums.GroupType | null
    name: string | null
    description: string | null
    imageUrl: string | null
    websiteUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    creatorUserId: number
    groupType: number
    name: number
    description: number
    imageUrl: number
    websiteUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    creatorUserId?: true
    groupType?: true
    name?: true
    description?: true
    imageUrl?: true
    websiteUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    creatorUserId?: true
    groupType?: true
    name?: true
    description?: true
    imageUrl?: true
    websiteUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    creatorUserId?: true
    groupType?: true
    name?: true
    description?: true
    imageUrl?: true
    websiteUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    creatorUserId: string
    groupType: $Enums.GroupType
    name: string
    description: string | null
    imageUrl: string | null
    websiteUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorUserId?: boolean
    groupType?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    websiteUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    groupAddress?: boolean | Group$groupAddressArgs<ExtArgs>
    groupUser?: boolean | Group$groupUserArgs<ExtArgs>
    groupNews?: boolean | Group$groupNewsArgs<ExtArgs>
    reading?: boolean | Group$readingArgs<ExtArgs>
    groupUrl?: boolean | Group$groupUrlArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorUserId?: boolean
    groupType?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    websiteUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorUserId?: boolean
    groupType?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    websiteUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    creatorUserId?: boolean
    groupType?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    websiteUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorUserId" | "groupType" | "name" | "description" | "imageUrl" | "websiteUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupAddress?: boolean | Group$groupAddressArgs<ExtArgs>
    groupUser?: boolean | Group$groupUserArgs<ExtArgs>
    groupNews?: boolean | Group$groupNewsArgs<ExtArgs>
    reading?: boolean | Group$readingArgs<ExtArgs>
    groupUrl?: boolean | Group$groupUrlArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      groupAddress: Prisma.$GroupAddressPayload<ExtArgs>[]
      groupUser: Prisma.$GroupUserPayload<ExtArgs>[]
      groupNews: Prisma.$GroupNewsPayload<ExtArgs>[]
      reading: Prisma.$ReadingPayload<ExtArgs>[]
      groupUrl: Prisma.$GroupUrlPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorUserId: string
      groupType: $Enums.GroupType
      name: string
      description: string | null
      imageUrl: string | null
      websiteUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groupAddress<T extends Group$groupAddressArgs<ExtArgs> = {}>(args?: Subset<T, Group$groupAddressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupUser<T extends Group$groupUserArgs<ExtArgs> = {}>(args?: Subset<T, Group$groupUserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupNews<T extends Group$groupNewsArgs<ExtArgs> = {}>(args?: Subset<T, Group$groupNewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reading<T extends Group$readingArgs<ExtArgs> = {}>(args?: Subset<T, Group$readingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupUrl<T extends Group$groupUrlArgs<ExtArgs> = {}>(args?: Subset<T, Group$groupUrlArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly creatorUserId: FieldRef<"Group", 'String'>
    readonly groupType: FieldRef<"Group", 'GroupType'>
    readonly name: FieldRef<"Group", 'String'>
    readonly description: FieldRef<"Group", 'String'>
    readonly imageUrl: FieldRef<"Group", 'String'>
    readonly websiteUrl: FieldRef<"Group", 'String'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
    readonly updatedAt: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group updateManyAndReturn
   */
  export type GroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.groupAddress
   */
  export type Group$groupAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    where?: GroupAddressWhereInput
    orderBy?: GroupAddressOrderByWithRelationInput | GroupAddressOrderByWithRelationInput[]
    cursor?: GroupAddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupAddressScalarFieldEnum | GroupAddressScalarFieldEnum[]
  }

  /**
   * Group.groupUser
   */
  export type Group$groupUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    where?: GroupUserWhereInput
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    cursor?: GroupUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * Group.groupNews
   */
  export type Group$groupNewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    where?: GroupNewsWhereInput
    orderBy?: GroupNewsOrderByWithRelationInput | GroupNewsOrderByWithRelationInput[]
    cursor?: GroupNewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupNewsScalarFieldEnum | GroupNewsScalarFieldEnum[]
  }

  /**
   * Group.reading
   */
  export type Group$readingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    where?: ReadingWhereInput
    orderBy?: ReadingOrderByWithRelationInput | ReadingOrderByWithRelationInput[]
    cursor?: ReadingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingScalarFieldEnum | ReadingScalarFieldEnum[]
  }

  /**
   * Group.groupUrl
   */
  export type Group$groupUrlArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    where?: GroupUrlWhereInput
    orderBy?: GroupUrlOrderByWithRelationInput | GroupUrlOrderByWithRelationInput[]
    cursor?: GroupUrlWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupUrlScalarFieldEnum | GroupUrlScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model GroupAddress
   */

  export type AggregateGroupAddress = {
    _count: GroupAddressCountAggregateOutputType | null
    _min: GroupAddressMinAggregateOutputType | null
    _max: GroupAddressMaxAggregateOutputType | null
  }

  export type GroupAddressMinAggregateOutputType = {
    id: string | null
    street: string | null
    city: string | null
    state: string | null
    zip: string | null
    groupId: string | null
  }

  export type GroupAddressMaxAggregateOutputType = {
    id: string | null
    street: string | null
    city: string | null
    state: string | null
    zip: string | null
    groupId: string | null
  }

  export type GroupAddressCountAggregateOutputType = {
    id: number
    street: number
    city: number
    state: number
    zip: number
    groupId: number
    _all: number
  }


  export type GroupAddressMinAggregateInputType = {
    id?: true
    street?: true
    city?: true
    state?: true
    zip?: true
    groupId?: true
  }

  export type GroupAddressMaxAggregateInputType = {
    id?: true
    street?: true
    city?: true
    state?: true
    zip?: true
    groupId?: true
  }

  export type GroupAddressCountAggregateInputType = {
    id?: true
    street?: true
    city?: true
    state?: true
    zip?: true
    groupId?: true
    _all?: true
  }

  export type GroupAddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupAddress to aggregate.
     */
    where?: GroupAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupAddresses to fetch.
     */
    orderBy?: GroupAddressOrderByWithRelationInput | GroupAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupAddresses
    **/
    _count?: true | GroupAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupAddressMaxAggregateInputType
  }

  export type GetGroupAddressAggregateType<T extends GroupAddressAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupAddress[P]>
      : GetScalarType<T[P], AggregateGroupAddress[P]>
  }




  export type GroupAddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupAddressWhereInput
    orderBy?: GroupAddressOrderByWithAggregationInput | GroupAddressOrderByWithAggregationInput[]
    by: GroupAddressScalarFieldEnum[] | GroupAddressScalarFieldEnum
    having?: GroupAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupAddressCountAggregateInputType | true
    _min?: GroupAddressMinAggregateInputType
    _max?: GroupAddressMaxAggregateInputType
  }

  export type GroupAddressGroupByOutputType = {
    id: string
    street: string
    city: string
    state: string
    zip: string
    groupId: string
    _count: GroupAddressCountAggregateOutputType | null
    _min: GroupAddressMinAggregateOutputType | null
    _max: GroupAddressMaxAggregateOutputType | null
  }

  type GetGroupAddressGroupByPayload<T extends GroupAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupAddressGroupByOutputType[P]>
            : GetScalarType<T[P], GroupAddressGroupByOutputType[P]>
        }
      >
    >


  export type GroupAddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    groupId?: boolean
    group?: boolean | GroupAddress$groupArgs<ExtArgs>
    reading?: boolean | GroupAddress$readingArgs<ExtArgs>
  }, ExtArgs["result"]["groupAddress"]>

  export type GroupAddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    groupId?: boolean
    group?: boolean | GroupAddress$groupArgs<ExtArgs>
  }, ExtArgs["result"]["groupAddress"]>

  export type GroupAddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    groupId?: boolean
    group?: boolean | GroupAddress$groupArgs<ExtArgs>
  }, ExtArgs["result"]["groupAddress"]>

  export type GroupAddressSelectScalar = {
    id?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    groupId?: boolean
  }

  export type GroupAddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "street" | "city" | "state" | "zip" | "groupId", ExtArgs["result"]["groupAddress"]>
  export type GroupAddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupAddress$groupArgs<ExtArgs>
    reading?: boolean | GroupAddress$readingArgs<ExtArgs>
  }
  export type GroupAddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupAddress$groupArgs<ExtArgs>
  }
  export type GroupAddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupAddress$groupArgs<ExtArgs>
  }

  export type $GroupAddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupAddress"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs> | null
      reading: Prisma.$ReadingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      street: string
      city: string
      state: string
      zip: string
      groupId: string
    }, ExtArgs["result"]["groupAddress"]>
    composites: {}
  }

  type GroupAddressGetPayload<S extends boolean | null | undefined | GroupAddressDefaultArgs> = $Result.GetResult<Prisma.$GroupAddressPayload, S>

  type GroupAddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupAddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupAddressCountAggregateInputType | true
    }

  export interface GroupAddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupAddress'], meta: { name: 'GroupAddress' } }
    /**
     * Find zero or one GroupAddress that matches the filter.
     * @param {GroupAddressFindUniqueArgs} args - Arguments to find a GroupAddress
     * @example
     * // Get one GroupAddress
     * const groupAddress = await prisma.groupAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupAddressFindUniqueArgs>(args: SelectSubset<T, GroupAddressFindUniqueArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupAddress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupAddressFindUniqueOrThrowArgs} args - Arguments to find a GroupAddress
     * @example
     * // Get one GroupAddress
     * const groupAddress = await prisma.groupAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupAddressFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAddressFindFirstArgs} args - Arguments to find a GroupAddress
     * @example
     * // Get one GroupAddress
     * const groupAddress = await prisma.groupAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupAddressFindFirstArgs>(args?: SelectSubset<T, GroupAddressFindFirstArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupAddress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAddressFindFirstOrThrowArgs} args - Arguments to find a GroupAddress
     * @example
     * // Get one GroupAddress
     * const groupAddress = await prisma.groupAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupAddressFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupAddresses
     * const groupAddresses = await prisma.groupAddress.findMany()
     * 
     * // Get first 10 GroupAddresses
     * const groupAddresses = await prisma.groupAddress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupAddressWithIdOnly = await prisma.groupAddress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupAddressFindManyArgs>(args?: SelectSubset<T, GroupAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupAddress.
     * @param {GroupAddressCreateArgs} args - Arguments to create a GroupAddress.
     * @example
     * // Create one GroupAddress
     * const GroupAddress = await prisma.groupAddress.create({
     *   data: {
     *     // ... data to create a GroupAddress
     *   }
     * })
     * 
     */
    create<T extends GroupAddressCreateArgs>(args: SelectSubset<T, GroupAddressCreateArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupAddresses.
     * @param {GroupAddressCreateManyArgs} args - Arguments to create many GroupAddresses.
     * @example
     * // Create many GroupAddresses
     * const groupAddress = await prisma.groupAddress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupAddressCreateManyArgs>(args?: SelectSubset<T, GroupAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupAddresses and returns the data saved in the database.
     * @param {GroupAddressCreateManyAndReturnArgs} args - Arguments to create many GroupAddresses.
     * @example
     * // Create many GroupAddresses
     * const groupAddress = await prisma.groupAddress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupAddresses and only return the `id`
     * const groupAddressWithIdOnly = await prisma.groupAddress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupAddressCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupAddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupAddress.
     * @param {GroupAddressDeleteArgs} args - Arguments to delete one GroupAddress.
     * @example
     * // Delete one GroupAddress
     * const GroupAddress = await prisma.groupAddress.delete({
     *   where: {
     *     // ... filter to delete one GroupAddress
     *   }
     * })
     * 
     */
    delete<T extends GroupAddressDeleteArgs>(args: SelectSubset<T, GroupAddressDeleteArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupAddress.
     * @param {GroupAddressUpdateArgs} args - Arguments to update one GroupAddress.
     * @example
     * // Update one GroupAddress
     * const groupAddress = await prisma.groupAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupAddressUpdateArgs>(args: SelectSubset<T, GroupAddressUpdateArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupAddresses.
     * @param {GroupAddressDeleteManyArgs} args - Arguments to filter GroupAddresses to delete.
     * @example
     * // Delete a few GroupAddresses
     * const { count } = await prisma.groupAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupAddressDeleteManyArgs>(args?: SelectSubset<T, GroupAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupAddresses
     * const groupAddress = await prisma.groupAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupAddressUpdateManyArgs>(args: SelectSubset<T, GroupAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupAddresses and returns the data updated in the database.
     * @param {GroupAddressUpdateManyAndReturnArgs} args - Arguments to update many GroupAddresses.
     * @example
     * // Update many GroupAddresses
     * const groupAddress = await prisma.groupAddress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupAddresses and only return the `id`
     * const groupAddressWithIdOnly = await prisma.groupAddress.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupAddressUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupAddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupAddress.
     * @param {GroupAddressUpsertArgs} args - Arguments to update or create a GroupAddress.
     * @example
     * // Update or create a GroupAddress
     * const groupAddress = await prisma.groupAddress.upsert({
     *   create: {
     *     // ... data to create a GroupAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupAddress we want to update
     *   }
     * })
     */
    upsert<T extends GroupAddressUpsertArgs>(args: SelectSubset<T, GroupAddressUpsertArgs<ExtArgs>>): Prisma__GroupAddressClient<$Result.GetResult<Prisma.$GroupAddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAddressCountArgs} args - Arguments to filter GroupAddresses to count.
     * @example
     * // Count the number of GroupAddresses
     * const count = await prisma.groupAddress.count({
     *   where: {
     *     // ... the filter for the GroupAddresses we want to count
     *   }
     * })
    **/
    count<T extends GroupAddressCountArgs>(
      args?: Subset<T, GroupAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAddressAggregateArgs>(args: Subset<T, GroupAddressAggregateArgs>): Prisma.PrismaPromise<GetGroupAddressAggregateType<T>>

    /**
     * Group by GroupAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAddressGroupByArgs} args - Group by arguments.
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
      T extends GroupAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupAddressGroupByArgs['orderBy'] }
        : { orderBy?: GroupAddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupAddress model
   */
  readonly fields: GroupAddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupAddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupAddress$groupArgs<ExtArgs> = {}>(args?: Subset<T, GroupAddress$groupArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reading<T extends GroupAddress$readingArgs<ExtArgs> = {}>(args?: Subset<T, GroupAddress$readingArgs<ExtArgs>>): Prisma__ReadingClient<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupAddress model
   */
  interface GroupAddressFieldRefs {
    readonly id: FieldRef<"GroupAddress", 'String'>
    readonly street: FieldRef<"GroupAddress", 'String'>
    readonly city: FieldRef<"GroupAddress", 'String'>
    readonly state: FieldRef<"GroupAddress", 'String'>
    readonly zip: FieldRef<"GroupAddress", 'String'>
    readonly groupId: FieldRef<"GroupAddress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GroupAddress findUnique
   */
  export type GroupAddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * Filter, which GroupAddress to fetch.
     */
    where: GroupAddressWhereUniqueInput
  }

  /**
   * GroupAddress findUniqueOrThrow
   */
  export type GroupAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * Filter, which GroupAddress to fetch.
     */
    where: GroupAddressWhereUniqueInput
  }

  /**
   * GroupAddress findFirst
   */
  export type GroupAddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * Filter, which GroupAddress to fetch.
     */
    where?: GroupAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupAddresses to fetch.
     */
    orderBy?: GroupAddressOrderByWithRelationInput | GroupAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupAddresses.
     */
    cursor?: GroupAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupAddresses.
     */
    distinct?: GroupAddressScalarFieldEnum | GroupAddressScalarFieldEnum[]
  }

  /**
   * GroupAddress findFirstOrThrow
   */
  export type GroupAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * Filter, which GroupAddress to fetch.
     */
    where?: GroupAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupAddresses to fetch.
     */
    orderBy?: GroupAddressOrderByWithRelationInput | GroupAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupAddresses.
     */
    cursor?: GroupAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupAddresses.
     */
    distinct?: GroupAddressScalarFieldEnum | GroupAddressScalarFieldEnum[]
  }

  /**
   * GroupAddress findMany
   */
  export type GroupAddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * Filter, which GroupAddresses to fetch.
     */
    where?: GroupAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupAddresses to fetch.
     */
    orderBy?: GroupAddressOrderByWithRelationInput | GroupAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupAddresses.
     */
    cursor?: GroupAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupAddresses.
     */
    skip?: number
    distinct?: GroupAddressScalarFieldEnum | GroupAddressScalarFieldEnum[]
  }

  /**
   * GroupAddress create
   */
  export type GroupAddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupAddress.
     */
    data: XOR<GroupAddressCreateInput, GroupAddressUncheckedCreateInput>
  }

  /**
   * GroupAddress createMany
   */
  export type GroupAddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupAddresses.
     */
    data: GroupAddressCreateManyInput | GroupAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupAddress createManyAndReturn
   */
  export type GroupAddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * The data used to create many GroupAddresses.
     */
    data: GroupAddressCreateManyInput | GroupAddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupAddress update
   */
  export type GroupAddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupAddress.
     */
    data: XOR<GroupAddressUpdateInput, GroupAddressUncheckedUpdateInput>
    /**
     * Choose, which GroupAddress to update.
     */
    where: GroupAddressWhereUniqueInput
  }

  /**
   * GroupAddress updateMany
   */
  export type GroupAddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupAddresses.
     */
    data: XOR<GroupAddressUpdateManyMutationInput, GroupAddressUncheckedUpdateManyInput>
    /**
     * Filter which GroupAddresses to update
     */
    where?: GroupAddressWhereInput
    /**
     * Limit how many GroupAddresses to update.
     */
    limit?: number
  }

  /**
   * GroupAddress updateManyAndReturn
   */
  export type GroupAddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * The data used to update GroupAddresses.
     */
    data: XOR<GroupAddressUpdateManyMutationInput, GroupAddressUncheckedUpdateManyInput>
    /**
     * Filter which GroupAddresses to update
     */
    where?: GroupAddressWhereInput
    /**
     * Limit how many GroupAddresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupAddress upsert
   */
  export type GroupAddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupAddress to update in case it exists.
     */
    where: GroupAddressWhereUniqueInput
    /**
     * In case the GroupAddress found by the `where` argument doesn't exist, create a new GroupAddress with this data.
     */
    create: XOR<GroupAddressCreateInput, GroupAddressUncheckedCreateInput>
    /**
     * In case the GroupAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupAddressUpdateInput, GroupAddressUncheckedUpdateInput>
  }

  /**
   * GroupAddress delete
   */
  export type GroupAddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
    /**
     * Filter which GroupAddress to delete.
     */
    where: GroupAddressWhereUniqueInput
  }

  /**
   * GroupAddress deleteMany
   */
  export type GroupAddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupAddresses to delete
     */
    where?: GroupAddressWhereInput
    /**
     * Limit how many GroupAddresses to delete.
     */
    limit?: number
  }

  /**
   * GroupAddress.group
   */
  export type GroupAddress$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
  }

  /**
   * GroupAddress.reading
   */
  export type GroupAddress$readingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    where?: ReadingWhereInput
  }

  /**
   * GroupAddress without action
   */
  export type GroupAddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupAddress
     */
    select?: GroupAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupAddress
     */
    omit?: GroupAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupAddressInclude<ExtArgs> | null
  }


  /**
   * Model GroupNews
   */

  export type AggregateGroupNews = {
    _count: GroupNewsCountAggregateOutputType | null
    _min: GroupNewsMinAggregateOutputType | null
    _max: GroupNewsMaxAggregateOutputType | null
  }

  export type GroupNewsMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    title: string | null
    content: string | null
    postedAt: Date | null
    archived: boolean | null
  }

  export type GroupNewsMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    title: string | null
    content: string | null
    postedAt: Date | null
    archived: boolean | null
  }

  export type GroupNewsCountAggregateOutputType = {
    id: number
    groupId: number
    title: number
    content: number
    postedAt: number
    archived: number
    _all: number
  }


  export type GroupNewsMinAggregateInputType = {
    id?: true
    groupId?: true
    title?: true
    content?: true
    postedAt?: true
    archived?: true
  }

  export type GroupNewsMaxAggregateInputType = {
    id?: true
    groupId?: true
    title?: true
    content?: true
    postedAt?: true
    archived?: true
  }

  export type GroupNewsCountAggregateInputType = {
    id?: true
    groupId?: true
    title?: true
    content?: true
    postedAt?: true
    archived?: true
    _all?: true
  }

  export type GroupNewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupNews to aggregate.
     */
    where?: GroupNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupNews to fetch.
     */
    orderBy?: GroupNewsOrderByWithRelationInput | GroupNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupNews
    **/
    _count?: true | GroupNewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupNewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupNewsMaxAggregateInputType
  }

  export type GetGroupNewsAggregateType<T extends GroupNewsAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupNews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupNews[P]>
      : GetScalarType<T[P], AggregateGroupNews[P]>
  }




  export type GroupNewsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupNewsWhereInput
    orderBy?: GroupNewsOrderByWithAggregationInput | GroupNewsOrderByWithAggregationInput[]
    by: GroupNewsScalarFieldEnum[] | GroupNewsScalarFieldEnum
    having?: GroupNewsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupNewsCountAggregateInputType | true
    _min?: GroupNewsMinAggregateInputType
    _max?: GroupNewsMaxAggregateInputType
  }

  export type GroupNewsGroupByOutputType = {
    id: string
    groupId: string
    title: string
    content: string | null
    postedAt: Date
    archived: boolean
    _count: GroupNewsCountAggregateOutputType | null
    _min: GroupNewsMinAggregateOutputType | null
    _max: GroupNewsMaxAggregateOutputType | null
  }

  type GetGroupNewsGroupByPayload<T extends GroupNewsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupNewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupNewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupNewsGroupByOutputType[P]>
            : GetScalarType<T[P], GroupNewsGroupByOutputType[P]>
        }
      >
    >


  export type GroupNewsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    archived?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupNews"]>

  export type GroupNewsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    archived?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupNews"]>

  export type GroupNewsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    archived?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupNews"]>

  export type GroupNewsSelectScalar = {
    id?: boolean
    groupId?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    archived?: boolean
  }

  export type GroupNewsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "groupId" | "title" | "content" | "postedAt" | "archived", ExtArgs["result"]["groupNews"]>
  export type GroupNewsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupNewsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupNewsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $GroupNewsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupNews"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      groupId: string
      title: string
      content: string | null
      postedAt: Date
      archived: boolean
    }, ExtArgs["result"]["groupNews"]>
    composites: {}
  }

  type GroupNewsGetPayload<S extends boolean | null | undefined | GroupNewsDefaultArgs> = $Result.GetResult<Prisma.$GroupNewsPayload, S>

  type GroupNewsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupNewsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupNewsCountAggregateInputType | true
    }

  export interface GroupNewsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupNews'], meta: { name: 'GroupNews' } }
    /**
     * Find zero or one GroupNews that matches the filter.
     * @param {GroupNewsFindUniqueArgs} args - Arguments to find a GroupNews
     * @example
     * // Get one GroupNews
     * const groupNews = await prisma.groupNews.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupNewsFindUniqueArgs>(args: SelectSubset<T, GroupNewsFindUniqueArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupNews that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupNewsFindUniqueOrThrowArgs} args - Arguments to find a GroupNews
     * @example
     * // Get one GroupNews
     * const groupNews = await prisma.groupNews.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupNewsFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupNewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupNews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupNewsFindFirstArgs} args - Arguments to find a GroupNews
     * @example
     * // Get one GroupNews
     * const groupNews = await prisma.groupNews.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupNewsFindFirstArgs>(args?: SelectSubset<T, GroupNewsFindFirstArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupNews that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupNewsFindFirstOrThrowArgs} args - Arguments to find a GroupNews
     * @example
     * // Get one GroupNews
     * const groupNews = await prisma.groupNews.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupNewsFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupNewsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupNews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupNewsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupNews
     * const groupNews = await prisma.groupNews.findMany()
     * 
     * // Get first 10 GroupNews
     * const groupNews = await prisma.groupNews.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupNewsWithIdOnly = await prisma.groupNews.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupNewsFindManyArgs>(args?: SelectSubset<T, GroupNewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupNews.
     * @param {GroupNewsCreateArgs} args - Arguments to create a GroupNews.
     * @example
     * // Create one GroupNews
     * const GroupNews = await prisma.groupNews.create({
     *   data: {
     *     // ... data to create a GroupNews
     *   }
     * })
     * 
     */
    create<T extends GroupNewsCreateArgs>(args: SelectSubset<T, GroupNewsCreateArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupNews.
     * @param {GroupNewsCreateManyArgs} args - Arguments to create many GroupNews.
     * @example
     * // Create many GroupNews
     * const groupNews = await prisma.groupNews.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupNewsCreateManyArgs>(args?: SelectSubset<T, GroupNewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupNews and returns the data saved in the database.
     * @param {GroupNewsCreateManyAndReturnArgs} args - Arguments to create many GroupNews.
     * @example
     * // Create many GroupNews
     * const groupNews = await prisma.groupNews.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupNews and only return the `id`
     * const groupNewsWithIdOnly = await prisma.groupNews.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupNewsCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupNewsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupNews.
     * @param {GroupNewsDeleteArgs} args - Arguments to delete one GroupNews.
     * @example
     * // Delete one GroupNews
     * const GroupNews = await prisma.groupNews.delete({
     *   where: {
     *     // ... filter to delete one GroupNews
     *   }
     * })
     * 
     */
    delete<T extends GroupNewsDeleteArgs>(args: SelectSubset<T, GroupNewsDeleteArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupNews.
     * @param {GroupNewsUpdateArgs} args - Arguments to update one GroupNews.
     * @example
     * // Update one GroupNews
     * const groupNews = await prisma.groupNews.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupNewsUpdateArgs>(args: SelectSubset<T, GroupNewsUpdateArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupNews.
     * @param {GroupNewsDeleteManyArgs} args - Arguments to filter GroupNews to delete.
     * @example
     * // Delete a few GroupNews
     * const { count } = await prisma.groupNews.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupNewsDeleteManyArgs>(args?: SelectSubset<T, GroupNewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupNewsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupNews
     * const groupNews = await prisma.groupNews.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupNewsUpdateManyArgs>(args: SelectSubset<T, GroupNewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupNews and returns the data updated in the database.
     * @param {GroupNewsUpdateManyAndReturnArgs} args - Arguments to update many GroupNews.
     * @example
     * // Update many GroupNews
     * const groupNews = await prisma.groupNews.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupNews and only return the `id`
     * const groupNewsWithIdOnly = await prisma.groupNews.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupNewsUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupNewsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupNews.
     * @param {GroupNewsUpsertArgs} args - Arguments to update or create a GroupNews.
     * @example
     * // Update or create a GroupNews
     * const groupNews = await prisma.groupNews.upsert({
     *   create: {
     *     // ... data to create a GroupNews
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupNews we want to update
     *   }
     * })
     */
    upsert<T extends GroupNewsUpsertArgs>(args: SelectSubset<T, GroupNewsUpsertArgs<ExtArgs>>): Prisma__GroupNewsClient<$Result.GetResult<Prisma.$GroupNewsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupNewsCountArgs} args - Arguments to filter GroupNews to count.
     * @example
     * // Count the number of GroupNews
     * const count = await prisma.groupNews.count({
     *   where: {
     *     // ... the filter for the GroupNews we want to count
     *   }
     * })
    **/
    count<T extends GroupNewsCountArgs>(
      args?: Subset<T, GroupNewsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupNewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupNewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupNewsAggregateArgs>(args: Subset<T, GroupNewsAggregateArgs>): Prisma.PrismaPromise<GetGroupNewsAggregateType<T>>

    /**
     * Group by GroupNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupNewsGroupByArgs} args - Group by arguments.
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
      T extends GroupNewsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupNewsGroupByArgs['orderBy'] }
        : { orderBy?: GroupNewsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupNewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupNewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupNews model
   */
  readonly fields: GroupNewsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupNews.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupNewsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupNews model
   */
  interface GroupNewsFieldRefs {
    readonly id: FieldRef<"GroupNews", 'String'>
    readonly groupId: FieldRef<"GroupNews", 'String'>
    readonly title: FieldRef<"GroupNews", 'String'>
    readonly content: FieldRef<"GroupNews", 'String'>
    readonly postedAt: FieldRef<"GroupNews", 'DateTime'>
    readonly archived: FieldRef<"GroupNews", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * GroupNews findUnique
   */
  export type GroupNewsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * Filter, which GroupNews to fetch.
     */
    where: GroupNewsWhereUniqueInput
  }

  /**
   * GroupNews findUniqueOrThrow
   */
  export type GroupNewsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * Filter, which GroupNews to fetch.
     */
    where: GroupNewsWhereUniqueInput
  }

  /**
   * GroupNews findFirst
   */
  export type GroupNewsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * Filter, which GroupNews to fetch.
     */
    where?: GroupNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupNews to fetch.
     */
    orderBy?: GroupNewsOrderByWithRelationInput | GroupNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupNews.
     */
    cursor?: GroupNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupNews.
     */
    distinct?: GroupNewsScalarFieldEnum | GroupNewsScalarFieldEnum[]
  }

  /**
   * GroupNews findFirstOrThrow
   */
  export type GroupNewsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * Filter, which GroupNews to fetch.
     */
    where?: GroupNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupNews to fetch.
     */
    orderBy?: GroupNewsOrderByWithRelationInput | GroupNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupNews.
     */
    cursor?: GroupNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupNews.
     */
    distinct?: GroupNewsScalarFieldEnum | GroupNewsScalarFieldEnum[]
  }

  /**
   * GroupNews findMany
   */
  export type GroupNewsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * Filter, which GroupNews to fetch.
     */
    where?: GroupNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupNews to fetch.
     */
    orderBy?: GroupNewsOrderByWithRelationInput | GroupNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupNews.
     */
    cursor?: GroupNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupNews.
     */
    skip?: number
    distinct?: GroupNewsScalarFieldEnum | GroupNewsScalarFieldEnum[]
  }

  /**
   * GroupNews create
   */
  export type GroupNewsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupNews.
     */
    data: XOR<GroupNewsCreateInput, GroupNewsUncheckedCreateInput>
  }

  /**
   * GroupNews createMany
   */
  export type GroupNewsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupNews.
     */
    data: GroupNewsCreateManyInput | GroupNewsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupNews createManyAndReturn
   */
  export type GroupNewsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * The data used to create many GroupNews.
     */
    data: GroupNewsCreateManyInput | GroupNewsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupNews update
   */
  export type GroupNewsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupNews.
     */
    data: XOR<GroupNewsUpdateInput, GroupNewsUncheckedUpdateInput>
    /**
     * Choose, which GroupNews to update.
     */
    where: GroupNewsWhereUniqueInput
  }

  /**
   * GroupNews updateMany
   */
  export type GroupNewsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupNews.
     */
    data: XOR<GroupNewsUpdateManyMutationInput, GroupNewsUncheckedUpdateManyInput>
    /**
     * Filter which GroupNews to update
     */
    where?: GroupNewsWhereInput
    /**
     * Limit how many GroupNews to update.
     */
    limit?: number
  }

  /**
   * GroupNews updateManyAndReturn
   */
  export type GroupNewsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * The data used to update GroupNews.
     */
    data: XOR<GroupNewsUpdateManyMutationInput, GroupNewsUncheckedUpdateManyInput>
    /**
     * Filter which GroupNews to update
     */
    where?: GroupNewsWhereInput
    /**
     * Limit how many GroupNews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupNews upsert
   */
  export type GroupNewsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupNews to update in case it exists.
     */
    where: GroupNewsWhereUniqueInput
    /**
     * In case the GroupNews found by the `where` argument doesn't exist, create a new GroupNews with this data.
     */
    create: XOR<GroupNewsCreateInput, GroupNewsUncheckedCreateInput>
    /**
     * In case the GroupNews was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupNewsUpdateInput, GroupNewsUncheckedUpdateInput>
  }

  /**
   * GroupNews delete
   */
  export type GroupNewsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
    /**
     * Filter which GroupNews to delete.
     */
    where: GroupNewsWhereUniqueInput
  }

  /**
   * GroupNews deleteMany
   */
  export type GroupNewsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupNews to delete
     */
    where?: GroupNewsWhereInput
    /**
     * Limit how many GroupNews to delete.
     */
    limit?: number
  }

  /**
   * GroupNews without action
   */
  export type GroupNewsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupNews
     */
    select?: GroupNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupNews
     */
    omit?: GroupNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupNewsInclude<ExtArgs> | null
  }


  /**
   * Model GroupUser
   */

  export type AggregateGroupUser = {
    _count: GroupUserCountAggregateOutputType | null
    _min: GroupUserMinAggregateOutputType | null
    _max: GroupUserMaxAggregateOutputType | null
  }

  export type GroupUserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    isAdmin: boolean | null
    invitedBy: string | null
    createdAt: Date | null
  }

  export type GroupUserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    isAdmin: boolean | null
    invitedBy: string | null
    createdAt: Date | null
  }

  export type GroupUserCountAggregateOutputType = {
    id: number
    userId: number
    groupId: number
    isAdmin: number
    invitedBy: number
    createdAt: number
    _all: number
  }


  export type GroupUserMinAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    isAdmin?: true
    invitedBy?: true
    createdAt?: true
  }

  export type GroupUserMaxAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    isAdmin?: true
    invitedBy?: true
    createdAt?: true
  }

  export type GroupUserCountAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    isAdmin?: true
    invitedBy?: true
    createdAt?: true
    _all?: true
  }

  export type GroupUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupUser to aggregate.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupUsers
    **/
    _count?: true | GroupUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupUserMaxAggregateInputType
  }

  export type GetGroupUserAggregateType<T extends GroupUserAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupUser[P]>
      : GetScalarType<T[P], AggregateGroupUser[P]>
  }




  export type GroupUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUserWhereInput
    orderBy?: GroupUserOrderByWithAggregationInput | GroupUserOrderByWithAggregationInput[]
    by: GroupUserScalarFieldEnum[] | GroupUserScalarFieldEnum
    having?: GroupUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupUserCountAggregateInputType | true
    _min?: GroupUserMinAggregateInputType
    _max?: GroupUserMaxAggregateInputType
  }

  export type GroupUserGroupByOutputType = {
    id: string
    userId: string
    groupId: string
    isAdmin: boolean
    invitedBy: string | null
    createdAt: Date
    _count: GroupUserCountAggregateOutputType | null
    _min: GroupUserMinAggregateOutputType | null
    _max: GroupUserMaxAggregateOutputType | null
  }

  type GetGroupUserGroupByPayload<T extends GroupUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupUserGroupByOutputType[P]>
            : GetScalarType<T[P], GroupUserGroupByOutputType[P]>
        }
      >
    >


  export type GroupUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    isAdmin?: boolean
    invitedBy?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupUser"]>

  export type GroupUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    isAdmin?: boolean
    invitedBy?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupUser"]>

  export type GroupUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    isAdmin?: boolean
    invitedBy?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupUser"]>

  export type GroupUserSelectScalar = {
    id?: boolean
    userId?: boolean
    groupId?: boolean
    isAdmin?: boolean
    invitedBy?: boolean
    createdAt?: boolean
  }

  export type GroupUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "groupId" | "isAdmin" | "invitedBy" | "createdAt", ExtArgs["result"]["groupUser"]>
  export type GroupUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $GroupUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      groupId: string
      isAdmin: boolean
      invitedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["groupUser"]>
    composites: {}
  }

  type GroupUserGetPayload<S extends boolean | null | undefined | GroupUserDefaultArgs> = $Result.GetResult<Prisma.$GroupUserPayload, S>

  type GroupUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupUserCountAggregateInputType | true
    }

  export interface GroupUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupUser'], meta: { name: 'GroupUser' } }
    /**
     * Find zero or one GroupUser that matches the filter.
     * @param {GroupUserFindUniqueArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupUserFindUniqueArgs>(args: SelectSubset<T, GroupUserFindUniqueArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupUserFindUniqueOrThrowArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupUserFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserFindFirstArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupUserFindFirstArgs>(args?: SelectSubset<T, GroupUserFindFirstArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserFindFirstOrThrowArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupUserFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupUsers
     * const groupUsers = await prisma.groupUser.findMany()
     * 
     * // Get first 10 GroupUsers
     * const groupUsers = await prisma.groupUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupUserWithIdOnly = await prisma.groupUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupUserFindManyArgs>(args?: SelectSubset<T, GroupUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupUser.
     * @param {GroupUserCreateArgs} args - Arguments to create a GroupUser.
     * @example
     * // Create one GroupUser
     * const GroupUser = await prisma.groupUser.create({
     *   data: {
     *     // ... data to create a GroupUser
     *   }
     * })
     * 
     */
    create<T extends GroupUserCreateArgs>(args: SelectSubset<T, GroupUserCreateArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupUsers.
     * @param {GroupUserCreateManyArgs} args - Arguments to create many GroupUsers.
     * @example
     * // Create many GroupUsers
     * const groupUser = await prisma.groupUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupUserCreateManyArgs>(args?: SelectSubset<T, GroupUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupUsers and returns the data saved in the database.
     * @param {GroupUserCreateManyAndReturnArgs} args - Arguments to create many GroupUsers.
     * @example
     * // Create many GroupUsers
     * const groupUser = await prisma.groupUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupUsers and only return the `id`
     * const groupUserWithIdOnly = await prisma.groupUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupUserCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupUser.
     * @param {GroupUserDeleteArgs} args - Arguments to delete one GroupUser.
     * @example
     * // Delete one GroupUser
     * const GroupUser = await prisma.groupUser.delete({
     *   where: {
     *     // ... filter to delete one GroupUser
     *   }
     * })
     * 
     */
    delete<T extends GroupUserDeleteArgs>(args: SelectSubset<T, GroupUserDeleteArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupUser.
     * @param {GroupUserUpdateArgs} args - Arguments to update one GroupUser.
     * @example
     * // Update one GroupUser
     * const groupUser = await prisma.groupUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUserUpdateArgs>(args: SelectSubset<T, GroupUserUpdateArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupUsers.
     * @param {GroupUserDeleteManyArgs} args - Arguments to filter GroupUsers to delete.
     * @example
     * // Delete a few GroupUsers
     * const { count } = await prisma.groupUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupUserDeleteManyArgs>(args?: SelectSubset<T, GroupUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupUsers
     * const groupUser = await prisma.groupUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUserUpdateManyArgs>(args: SelectSubset<T, GroupUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupUsers and returns the data updated in the database.
     * @param {GroupUserUpdateManyAndReturnArgs} args - Arguments to update many GroupUsers.
     * @example
     * // Update many GroupUsers
     * const groupUser = await prisma.groupUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupUsers and only return the `id`
     * const groupUserWithIdOnly = await prisma.groupUser.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupUserUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupUser.
     * @param {GroupUserUpsertArgs} args - Arguments to update or create a GroupUser.
     * @example
     * // Update or create a GroupUser
     * const groupUser = await prisma.groupUser.upsert({
     *   create: {
     *     // ... data to create a GroupUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupUser we want to update
     *   }
     * })
     */
    upsert<T extends GroupUserUpsertArgs>(args: SelectSubset<T, GroupUserUpsertArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserCountArgs} args - Arguments to filter GroupUsers to count.
     * @example
     * // Count the number of GroupUsers
     * const count = await prisma.groupUser.count({
     *   where: {
     *     // ... the filter for the GroupUsers we want to count
     *   }
     * })
    **/
    count<T extends GroupUserCountArgs>(
      args?: Subset<T, GroupUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupUserAggregateArgs>(args: Subset<T, GroupUserAggregateArgs>): Prisma.PrismaPromise<GetGroupUserAggregateType<T>>

    /**
     * Group by GroupUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserGroupByArgs} args - Group by arguments.
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
      T extends GroupUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupUserGroupByArgs['orderBy'] }
        : { orderBy?: GroupUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupUser model
   */
  readonly fields: GroupUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupUser model
   */
  interface GroupUserFieldRefs {
    readonly id: FieldRef<"GroupUser", 'String'>
    readonly userId: FieldRef<"GroupUser", 'String'>
    readonly groupId: FieldRef<"GroupUser", 'String'>
    readonly isAdmin: FieldRef<"GroupUser", 'Boolean'>
    readonly invitedBy: FieldRef<"GroupUser", 'String'>
    readonly createdAt: FieldRef<"GroupUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupUser findUnique
   */
  export type GroupUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser findUniqueOrThrow
   */
  export type GroupUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser findFirst
   */
  export type GroupUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupUsers.
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupUsers.
     */
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * GroupUser findFirstOrThrow
   */
  export type GroupUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupUsers.
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupUsers.
     */
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * GroupUser findMany
   */
  export type GroupUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUsers to fetch.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupUsers.
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * GroupUser create
   */
  export type GroupUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupUser.
     */
    data: XOR<GroupUserCreateInput, GroupUserUncheckedCreateInput>
  }

  /**
   * GroupUser createMany
   */
  export type GroupUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupUsers.
     */
    data: GroupUserCreateManyInput | GroupUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupUser createManyAndReturn
   */
  export type GroupUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * The data used to create many GroupUsers.
     */
    data: GroupUserCreateManyInput | GroupUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupUser update
   */
  export type GroupUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupUser.
     */
    data: XOR<GroupUserUpdateInput, GroupUserUncheckedUpdateInput>
    /**
     * Choose, which GroupUser to update.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser updateMany
   */
  export type GroupUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupUsers.
     */
    data: XOR<GroupUserUpdateManyMutationInput, GroupUserUncheckedUpdateManyInput>
    /**
     * Filter which GroupUsers to update
     */
    where?: GroupUserWhereInput
    /**
     * Limit how many GroupUsers to update.
     */
    limit?: number
  }

  /**
   * GroupUser updateManyAndReturn
   */
  export type GroupUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * The data used to update GroupUsers.
     */
    data: XOR<GroupUserUpdateManyMutationInput, GroupUserUncheckedUpdateManyInput>
    /**
     * Filter which GroupUsers to update
     */
    where?: GroupUserWhereInput
    /**
     * Limit how many GroupUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupUser upsert
   */
  export type GroupUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupUser to update in case it exists.
     */
    where: GroupUserWhereUniqueInput
    /**
     * In case the GroupUser found by the `where` argument doesn't exist, create a new GroupUser with this data.
     */
    create: XOR<GroupUserCreateInput, GroupUserUncheckedCreateInput>
    /**
     * In case the GroupUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUserUpdateInput, GroupUserUncheckedUpdateInput>
  }

  /**
   * GroupUser delete
   */
  export type GroupUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter which GroupUser to delete.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser deleteMany
   */
  export type GroupUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupUsers to delete
     */
    where?: GroupUserWhereInput
    /**
     * Limit how many GroupUsers to delete.
     */
    limit?: number
  }

  /**
   * GroupUser without action
   */
  export type GroupUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
  }


  /**
   * Model GroupUrl
   */

  export type AggregateGroupUrl = {
    _count: GroupUrlCountAggregateOutputType | null
    _min: GroupUrlMinAggregateOutputType | null
    _max: GroupUrlMaxAggregateOutputType | null
  }

  export type GroupUrlMinAggregateOutputType = {
    id: string | null
    url: string | null
    groupId: string | null
    urlType: $Enums.UrlType | null
    createdAt: Date | null
  }

  export type GroupUrlMaxAggregateOutputType = {
    id: string | null
    url: string | null
    groupId: string | null
    urlType: $Enums.UrlType | null
    createdAt: Date | null
  }

  export type GroupUrlCountAggregateOutputType = {
    id: number
    url: number
    groupId: number
    urlType: number
    createdAt: number
    _all: number
  }


  export type GroupUrlMinAggregateInputType = {
    id?: true
    url?: true
    groupId?: true
    urlType?: true
    createdAt?: true
  }

  export type GroupUrlMaxAggregateInputType = {
    id?: true
    url?: true
    groupId?: true
    urlType?: true
    createdAt?: true
  }

  export type GroupUrlCountAggregateInputType = {
    id?: true
    url?: true
    groupId?: true
    urlType?: true
    createdAt?: true
    _all?: true
  }

  export type GroupUrlAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupUrl to aggregate.
     */
    where?: GroupUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUrls to fetch.
     */
    orderBy?: GroupUrlOrderByWithRelationInput | GroupUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupUrls
    **/
    _count?: true | GroupUrlCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupUrlMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupUrlMaxAggregateInputType
  }

  export type GetGroupUrlAggregateType<T extends GroupUrlAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupUrl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupUrl[P]>
      : GetScalarType<T[P], AggregateGroupUrl[P]>
  }




  export type GroupUrlGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUrlWhereInput
    orderBy?: GroupUrlOrderByWithAggregationInput | GroupUrlOrderByWithAggregationInput[]
    by: GroupUrlScalarFieldEnum[] | GroupUrlScalarFieldEnum
    having?: GroupUrlScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupUrlCountAggregateInputType | true
    _min?: GroupUrlMinAggregateInputType
    _max?: GroupUrlMaxAggregateInputType
  }

  export type GroupUrlGroupByOutputType = {
    id: string
    url: string
    groupId: string
    urlType: $Enums.UrlType
    createdAt: Date
    _count: GroupUrlCountAggregateOutputType | null
    _min: GroupUrlMinAggregateOutputType | null
    _max: GroupUrlMaxAggregateOutputType | null
  }

  type GetGroupUrlGroupByPayload<T extends GroupUrlGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupUrlGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupUrlGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupUrlGroupByOutputType[P]>
            : GetScalarType<T[P], GroupUrlGroupByOutputType[P]>
        }
      >
    >


  export type GroupUrlSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    groupId?: boolean
    urlType?: boolean
    createdAt?: boolean
    group?: boolean | GroupUrl$groupArgs<ExtArgs>
  }, ExtArgs["result"]["groupUrl"]>

  export type GroupUrlSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    groupId?: boolean
    urlType?: boolean
    createdAt?: boolean
    group?: boolean | GroupUrl$groupArgs<ExtArgs>
  }, ExtArgs["result"]["groupUrl"]>

  export type GroupUrlSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    groupId?: boolean
    urlType?: boolean
    createdAt?: boolean
    group?: boolean | GroupUrl$groupArgs<ExtArgs>
  }, ExtArgs["result"]["groupUrl"]>

  export type GroupUrlSelectScalar = {
    id?: boolean
    url?: boolean
    groupId?: boolean
    urlType?: boolean
    createdAt?: boolean
  }

  export type GroupUrlOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "groupId" | "urlType" | "createdAt", ExtArgs["result"]["groupUrl"]>
  export type GroupUrlInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupUrl$groupArgs<ExtArgs>
  }
  export type GroupUrlIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupUrl$groupArgs<ExtArgs>
  }
  export type GroupUrlIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupUrl$groupArgs<ExtArgs>
  }

  export type $GroupUrlPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupUrl"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      groupId: string
      urlType: $Enums.UrlType
      createdAt: Date
    }, ExtArgs["result"]["groupUrl"]>
    composites: {}
  }

  type GroupUrlGetPayload<S extends boolean | null | undefined | GroupUrlDefaultArgs> = $Result.GetResult<Prisma.$GroupUrlPayload, S>

  type GroupUrlCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupUrlFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupUrlCountAggregateInputType | true
    }

  export interface GroupUrlDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupUrl'], meta: { name: 'GroupUrl' } }
    /**
     * Find zero or one GroupUrl that matches the filter.
     * @param {GroupUrlFindUniqueArgs} args - Arguments to find a GroupUrl
     * @example
     * // Get one GroupUrl
     * const groupUrl = await prisma.groupUrl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupUrlFindUniqueArgs>(args: SelectSubset<T, GroupUrlFindUniqueArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupUrl that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupUrlFindUniqueOrThrowArgs} args - Arguments to find a GroupUrl
     * @example
     * // Get one GroupUrl
     * const groupUrl = await prisma.groupUrl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupUrlFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupUrlFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupUrl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUrlFindFirstArgs} args - Arguments to find a GroupUrl
     * @example
     * // Get one GroupUrl
     * const groupUrl = await prisma.groupUrl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupUrlFindFirstArgs>(args?: SelectSubset<T, GroupUrlFindFirstArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupUrl that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUrlFindFirstOrThrowArgs} args - Arguments to find a GroupUrl
     * @example
     * // Get one GroupUrl
     * const groupUrl = await prisma.groupUrl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupUrlFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupUrlFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupUrls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUrlFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupUrls
     * const groupUrls = await prisma.groupUrl.findMany()
     * 
     * // Get first 10 GroupUrls
     * const groupUrls = await prisma.groupUrl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupUrlWithIdOnly = await prisma.groupUrl.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupUrlFindManyArgs>(args?: SelectSubset<T, GroupUrlFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupUrl.
     * @param {GroupUrlCreateArgs} args - Arguments to create a GroupUrl.
     * @example
     * // Create one GroupUrl
     * const GroupUrl = await prisma.groupUrl.create({
     *   data: {
     *     // ... data to create a GroupUrl
     *   }
     * })
     * 
     */
    create<T extends GroupUrlCreateArgs>(args: SelectSubset<T, GroupUrlCreateArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupUrls.
     * @param {GroupUrlCreateManyArgs} args - Arguments to create many GroupUrls.
     * @example
     * // Create many GroupUrls
     * const groupUrl = await prisma.groupUrl.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupUrlCreateManyArgs>(args?: SelectSubset<T, GroupUrlCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupUrls and returns the data saved in the database.
     * @param {GroupUrlCreateManyAndReturnArgs} args - Arguments to create many GroupUrls.
     * @example
     * // Create many GroupUrls
     * const groupUrl = await prisma.groupUrl.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupUrls and only return the `id`
     * const groupUrlWithIdOnly = await prisma.groupUrl.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupUrlCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupUrlCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupUrl.
     * @param {GroupUrlDeleteArgs} args - Arguments to delete one GroupUrl.
     * @example
     * // Delete one GroupUrl
     * const GroupUrl = await prisma.groupUrl.delete({
     *   where: {
     *     // ... filter to delete one GroupUrl
     *   }
     * })
     * 
     */
    delete<T extends GroupUrlDeleteArgs>(args: SelectSubset<T, GroupUrlDeleteArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupUrl.
     * @param {GroupUrlUpdateArgs} args - Arguments to update one GroupUrl.
     * @example
     * // Update one GroupUrl
     * const groupUrl = await prisma.groupUrl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUrlUpdateArgs>(args: SelectSubset<T, GroupUrlUpdateArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupUrls.
     * @param {GroupUrlDeleteManyArgs} args - Arguments to filter GroupUrls to delete.
     * @example
     * // Delete a few GroupUrls
     * const { count } = await prisma.groupUrl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupUrlDeleteManyArgs>(args?: SelectSubset<T, GroupUrlDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupUrls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUrlUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupUrls
     * const groupUrl = await prisma.groupUrl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUrlUpdateManyArgs>(args: SelectSubset<T, GroupUrlUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupUrls and returns the data updated in the database.
     * @param {GroupUrlUpdateManyAndReturnArgs} args - Arguments to update many GroupUrls.
     * @example
     * // Update many GroupUrls
     * const groupUrl = await prisma.groupUrl.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupUrls and only return the `id`
     * const groupUrlWithIdOnly = await prisma.groupUrl.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupUrlUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUrlUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupUrl.
     * @param {GroupUrlUpsertArgs} args - Arguments to update or create a GroupUrl.
     * @example
     * // Update or create a GroupUrl
     * const groupUrl = await prisma.groupUrl.upsert({
     *   create: {
     *     // ... data to create a GroupUrl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupUrl we want to update
     *   }
     * })
     */
    upsert<T extends GroupUrlUpsertArgs>(args: SelectSubset<T, GroupUrlUpsertArgs<ExtArgs>>): Prisma__GroupUrlClient<$Result.GetResult<Prisma.$GroupUrlPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupUrls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUrlCountArgs} args - Arguments to filter GroupUrls to count.
     * @example
     * // Count the number of GroupUrls
     * const count = await prisma.groupUrl.count({
     *   where: {
     *     // ... the filter for the GroupUrls we want to count
     *   }
     * })
    **/
    count<T extends GroupUrlCountArgs>(
      args?: Subset<T, GroupUrlCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupUrlCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupUrl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUrlAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupUrlAggregateArgs>(args: Subset<T, GroupUrlAggregateArgs>): Prisma.PrismaPromise<GetGroupUrlAggregateType<T>>

    /**
     * Group by GroupUrl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUrlGroupByArgs} args - Group by arguments.
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
      T extends GroupUrlGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupUrlGroupByArgs['orderBy'] }
        : { orderBy?: GroupUrlGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupUrlGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupUrlGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupUrl model
   */
  readonly fields: GroupUrlFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupUrl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupUrlClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupUrl$groupArgs<ExtArgs> = {}>(args?: Subset<T, GroupUrl$groupArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupUrl model
   */
  interface GroupUrlFieldRefs {
    readonly id: FieldRef<"GroupUrl", 'String'>
    readonly url: FieldRef<"GroupUrl", 'String'>
    readonly groupId: FieldRef<"GroupUrl", 'String'>
    readonly urlType: FieldRef<"GroupUrl", 'UrlType'>
    readonly createdAt: FieldRef<"GroupUrl", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupUrl findUnique
   */
  export type GroupUrlFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * Filter, which GroupUrl to fetch.
     */
    where: GroupUrlWhereUniqueInput
  }

  /**
   * GroupUrl findUniqueOrThrow
   */
  export type GroupUrlFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * Filter, which GroupUrl to fetch.
     */
    where: GroupUrlWhereUniqueInput
  }

  /**
   * GroupUrl findFirst
   */
  export type GroupUrlFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * Filter, which GroupUrl to fetch.
     */
    where?: GroupUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUrls to fetch.
     */
    orderBy?: GroupUrlOrderByWithRelationInput | GroupUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupUrls.
     */
    cursor?: GroupUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupUrls.
     */
    distinct?: GroupUrlScalarFieldEnum | GroupUrlScalarFieldEnum[]
  }

  /**
   * GroupUrl findFirstOrThrow
   */
  export type GroupUrlFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * Filter, which GroupUrl to fetch.
     */
    where?: GroupUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUrls to fetch.
     */
    orderBy?: GroupUrlOrderByWithRelationInput | GroupUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupUrls.
     */
    cursor?: GroupUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupUrls.
     */
    distinct?: GroupUrlScalarFieldEnum | GroupUrlScalarFieldEnum[]
  }

  /**
   * GroupUrl findMany
   */
  export type GroupUrlFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * Filter, which GroupUrls to fetch.
     */
    where?: GroupUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUrls to fetch.
     */
    orderBy?: GroupUrlOrderByWithRelationInput | GroupUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupUrls.
     */
    cursor?: GroupUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUrls.
     */
    skip?: number
    distinct?: GroupUrlScalarFieldEnum | GroupUrlScalarFieldEnum[]
  }

  /**
   * GroupUrl create
   */
  export type GroupUrlCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupUrl.
     */
    data: XOR<GroupUrlCreateInput, GroupUrlUncheckedCreateInput>
  }

  /**
   * GroupUrl createMany
   */
  export type GroupUrlCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupUrls.
     */
    data: GroupUrlCreateManyInput | GroupUrlCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupUrl createManyAndReturn
   */
  export type GroupUrlCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * The data used to create many GroupUrls.
     */
    data: GroupUrlCreateManyInput | GroupUrlCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupUrl update
   */
  export type GroupUrlUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupUrl.
     */
    data: XOR<GroupUrlUpdateInput, GroupUrlUncheckedUpdateInput>
    /**
     * Choose, which GroupUrl to update.
     */
    where: GroupUrlWhereUniqueInput
  }

  /**
   * GroupUrl updateMany
   */
  export type GroupUrlUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupUrls.
     */
    data: XOR<GroupUrlUpdateManyMutationInput, GroupUrlUncheckedUpdateManyInput>
    /**
     * Filter which GroupUrls to update
     */
    where?: GroupUrlWhereInput
    /**
     * Limit how many GroupUrls to update.
     */
    limit?: number
  }

  /**
   * GroupUrl updateManyAndReturn
   */
  export type GroupUrlUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * The data used to update GroupUrls.
     */
    data: XOR<GroupUrlUpdateManyMutationInput, GroupUrlUncheckedUpdateManyInput>
    /**
     * Filter which GroupUrls to update
     */
    where?: GroupUrlWhereInput
    /**
     * Limit how many GroupUrls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupUrl upsert
   */
  export type GroupUrlUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupUrl to update in case it exists.
     */
    where: GroupUrlWhereUniqueInput
    /**
     * In case the GroupUrl found by the `where` argument doesn't exist, create a new GroupUrl with this data.
     */
    create: XOR<GroupUrlCreateInput, GroupUrlUncheckedCreateInput>
    /**
     * In case the GroupUrl was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUrlUpdateInput, GroupUrlUncheckedUpdateInput>
  }

  /**
   * GroupUrl delete
   */
  export type GroupUrlDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
    /**
     * Filter which GroupUrl to delete.
     */
    where: GroupUrlWhereUniqueInput
  }

  /**
   * GroupUrl deleteMany
   */
  export type GroupUrlDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupUrls to delete
     */
    where?: GroupUrlWhereInput
    /**
     * Limit how many GroupUrls to delete.
     */
    limit?: number
  }

  /**
   * GroupUrl.group
   */
  export type GroupUrl$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
  }

  /**
   * GroupUrl without action
   */
  export type GroupUrlDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUrl
     */
    select?: GroupUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUrl
     */
    omit?: GroupUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUrlInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    superTokensId: string | null
    email: string | null
    role: $Enums.Role | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    superTokensId: string | null
    email: string | null
    role: $Enums.Role | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    superTokensId: number
    email: number
    role: number
    username: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    superTokensId?: true
    email?: true
    role?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    superTokensId?: true
    email?: true
    role?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    superTokensId?: true
    email?: true
    role?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    superTokensId: string
    email: string
    role: $Enums.Role
    username: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    superTokensId?: boolean
    email?: boolean
    role?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    groupUser?: boolean | User$groupUserArgs<ExtArgs>
    group?: boolean | User$groupArgs<ExtArgs>
    reading?: boolean | User$readingArgs<ExtArgs>
    userProfile?: boolean | User$userProfileArgs<ExtArgs>
    appFiles?: boolean | User$appFilesArgs<ExtArgs>
    urls?: boolean | User$urlsArgs<ExtArgs>
    readingAuthor?: boolean | User$readingAuthorArgs<ExtArgs>
    readingFeedback?: boolean | User$readingFeedbackArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    superTokensId?: boolean
    email?: boolean
    role?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    superTokensId?: boolean
    email?: boolean
    role?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    superTokensId?: boolean
    email?: boolean
    role?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "superTokensId" | "email" | "role" | "username" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupUser?: boolean | User$groupUserArgs<ExtArgs>
    group?: boolean | User$groupArgs<ExtArgs>
    reading?: boolean | User$readingArgs<ExtArgs>
    userProfile?: boolean | User$userProfileArgs<ExtArgs>
    appFiles?: boolean | User$appFilesArgs<ExtArgs>
    urls?: boolean | User$urlsArgs<ExtArgs>
    readingAuthor?: boolean | User$readingAuthorArgs<ExtArgs>
    readingFeedback?: boolean | User$readingFeedbackArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      groupUser: Prisma.$GroupUserPayload<ExtArgs>[]
      group: Prisma.$GroupPayload<ExtArgs>[]
      reading: Prisma.$ReadingPayload<ExtArgs>[]
      userProfile: Prisma.$UserProfilePayload<ExtArgs> | null
      appFiles: Prisma.$AppFilePayload<ExtArgs>[]
      urls: Prisma.$UserUrlPayload<ExtArgs>[]
      readingAuthor: Prisma.$ReadingAuthorPayload<ExtArgs>[]
      readingFeedback: Prisma.$ReadingFeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      superTokensId: string
      email: string
      role: $Enums.Role
      username: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groupUser<T extends User$groupUserArgs<ExtArgs> = {}>(args?: Subset<T, User$groupUserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    group<T extends User$groupArgs<ExtArgs> = {}>(args?: Subset<T, User$groupArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reading<T extends User$readingArgs<ExtArgs> = {}>(args?: Subset<T, User$readingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userProfile<T extends User$userProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$userProfileArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    appFiles<T extends User$appFilesArgs<ExtArgs> = {}>(args?: Subset<T, User$appFilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    urls<T extends User$urlsArgs<ExtArgs> = {}>(args?: Subset<T, User$urlsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    readingAuthor<T extends User$readingAuthorArgs<ExtArgs> = {}>(args?: Subset<T, User$readingAuthorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingAuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    readingFeedback<T extends User$readingFeedbackArgs<ExtArgs> = {}>(args?: Subset<T, User$readingFeedbackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadingFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly superTokensId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly username: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.groupUser
   */
  export type User$groupUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    where?: GroupUserWhereInput
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    cursor?: GroupUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * User.group
   */
  export type User$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    cursor?: GroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * User.reading
   */
  export type User$readingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reading
     */
    select?: ReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reading
     */
    omit?: ReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingInclude<ExtArgs> | null
    where?: ReadingWhereInput
    orderBy?: ReadingOrderByWithRelationInput | ReadingOrderByWithRelationInput[]
    cursor?: ReadingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingScalarFieldEnum | ReadingScalarFieldEnum[]
  }

  /**
   * User.userProfile
   */
  export type User$userProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * User.appFiles
   */
  export type User$appFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppFile
     */
    select?: AppFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppFile
     */
    omit?: AppFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppFileInclude<ExtArgs> | null
    where?: AppFileWhereInput
    orderBy?: AppFileOrderByWithRelationInput | AppFileOrderByWithRelationInput[]
    cursor?: AppFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppFileScalarFieldEnum | AppFileScalarFieldEnum[]
  }

  /**
   * User.urls
   */
  export type User$urlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    where?: UserUrlWhereInput
    orderBy?: UserUrlOrderByWithRelationInput | UserUrlOrderByWithRelationInput[]
    cursor?: UserUrlWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserUrlScalarFieldEnum | UserUrlScalarFieldEnum[]
  }

  /**
   * User.readingAuthor
   */
  export type User$readingAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingAuthor
     */
    select?: ReadingAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingAuthor
     */
    omit?: ReadingAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingAuthorInclude<ExtArgs> | null
    where?: ReadingAuthorWhereInput
    orderBy?: ReadingAuthorOrderByWithRelationInput | ReadingAuthorOrderByWithRelationInput[]
    cursor?: ReadingAuthorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingAuthorScalarFieldEnum | ReadingAuthorScalarFieldEnum[]
  }

  /**
   * User.readingFeedback
   */
  export type User$readingFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadingFeedback
     */
    select?: ReadingFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadingFeedback
     */
    omit?: ReadingFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadingFeedbackInclude<ExtArgs> | null
    where?: ReadingFeedbackWhereInput
    orderBy?: ReadingFeedbackOrderByWithRelationInput | ReadingFeedbackOrderByWithRelationInput[]
    cursor?: ReadingFeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadingFeedbackScalarFieldEnum | ReadingFeedbackScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    bio: string | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    bio: string | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    phone: number
    bio: number
    _all: number
  }


  export type UserProfileMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    phone?: true
    bio?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    phone?: true
    bio?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    phone?: true
    bio?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    userId: string
    firstName: string | null
    lastName: string | null
    phone: string | null
    bio: string | null
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    bio?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    bio?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    bio?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    bio?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "firstName" | "lastName" | "phone" | "bio", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string | null
      lastName: string | null
      phone: string | null
      bio: string | null
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
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
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly userId: FieldRef<"UserProfile", 'String'>
    readonly firstName: FieldRef<"UserProfile", 'String'>
    readonly lastName: FieldRef<"UserProfile", 'String'>
    readonly phone: FieldRef<"UserProfile", 'String'>
    readonly bio: FieldRef<"UserProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model UserUrl
   */

  export type AggregateUserUrl = {
    _count: UserUrlCountAggregateOutputType | null
    _min: UserUrlMinAggregateOutputType | null
    _max: UserUrlMaxAggregateOutputType | null
  }

  export type UserUrlMinAggregateOutputType = {
    id: string | null
    url: string | null
    userId: string | null
    urlType: $Enums.UrlType | null
    createdAt: Date | null
  }

  export type UserUrlMaxAggregateOutputType = {
    id: string | null
    url: string | null
    userId: string | null
    urlType: $Enums.UrlType | null
    createdAt: Date | null
  }

  export type UserUrlCountAggregateOutputType = {
    id: number
    url: number
    userId: number
    urlType: number
    createdAt: number
    _all: number
  }


  export type UserUrlMinAggregateInputType = {
    id?: true
    url?: true
    userId?: true
    urlType?: true
    createdAt?: true
  }

  export type UserUrlMaxAggregateInputType = {
    id?: true
    url?: true
    userId?: true
    urlType?: true
    createdAt?: true
  }

  export type UserUrlCountAggregateInputType = {
    id?: true
    url?: true
    userId?: true
    urlType?: true
    createdAt?: true
    _all?: true
  }

  export type UserUrlAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserUrl to aggregate.
     */
    where?: UserUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserUrls to fetch.
     */
    orderBy?: UserUrlOrderByWithRelationInput | UserUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserUrls
    **/
    _count?: true | UserUrlCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserUrlMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserUrlMaxAggregateInputType
  }

  export type GetUserUrlAggregateType<T extends UserUrlAggregateArgs> = {
        [P in keyof T & keyof AggregateUserUrl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserUrl[P]>
      : GetScalarType<T[P], AggregateUserUrl[P]>
  }




  export type UserUrlGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserUrlWhereInput
    orderBy?: UserUrlOrderByWithAggregationInput | UserUrlOrderByWithAggregationInput[]
    by: UserUrlScalarFieldEnum[] | UserUrlScalarFieldEnum
    having?: UserUrlScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserUrlCountAggregateInputType | true
    _min?: UserUrlMinAggregateInputType
    _max?: UserUrlMaxAggregateInputType
  }

  export type UserUrlGroupByOutputType = {
    id: string
    url: string
    userId: string
    urlType: $Enums.UrlType
    createdAt: Date
    _count: UserUrlCountAggregateOutputType | null
    _min: UserUrlMinAggregateOutputType | null
    _max: UserUrlMaxAggregateOutputType | null
  }

  type GetUserUrlGroupByPayload<T extends UserUrlGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserUrlGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserUrlGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserUrlGroupByOutputType[P]>
            : GetScalarType<T[P], UserUrlGroupByOutputType[P]>
        }
      >
    >


  export type UserUrlSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    userId?: boolean
    urlType?: boolean
    createdAt?: boolean
    user?: boolean | UserUrl$userArgs<ExtArgs>
  }, ExtArgs["result"]["userUrl"]>

  export type UserUrlSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    userId?: boolean
    urlType?: boolean
    createdAt?: boolean
    user?: boolean | UserUrl$userArgs<ExtArgs>
  }, ExtArgs["result"]["userUrl"]>

  export type UserUrlSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    userId?: boolean
    urlType?: boolean
    createdAt?: boolean
    user?: boolean | UserUrl$userArgs<ExtArgs>
  }, ExtArgs["result"]["userUrl"]>

  export type UserUrlSelectScalar = {
    id?: boolean
    url?: boolean
    userId?: boolean
    urlType?: boolean
    createdAt?: boolean
  }

  export type UserUrlOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "userId" | "urlType" | "createdAt", ExtArgs["result"]["userUrl"]>
  export type UserUrlInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserUrl$userArgs<ExtArgs>
  }
  export type UserUrlIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserUrl$userArgs<ExtArgs>
  }
  export type UserUrlIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserUrl$userArgs<ExtArgs>
  }

  export type $UserUrlPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserUrl"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      userId: string
      urlType: $Enums.UrlType
      createdAt: Date
    }, ExtArgs["result"]["userUrl"]>
    composites: {}
  }

  type UserUrlGetPayload<S extends boolean | null | undefined | UserUrlDefaultArgs> = $Result.GetResult<Prisma.$UserUrlPayload, S>

  type UserUrlCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserUrlFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserUrlCountAggregateInputType | true
    }

  export interface UserUrlDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserUrl'], meta: { name: 'UserUrl' } }
    /**
     * Find zero or one UserUrl that matches the filter.
     * @param {UserUrlFindUniqueArgs} args - Arguments to find a UserUrl
     * @example
     * // Get one UserUrl
     * const userUrl = await prisma.userUrl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserUrlFindUniqueArgs>(args: SelectSubset<T, UserUrlFindUniqueArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserUrl that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserUrlFindUniqueOrThrowArgs} args - Arguments to find a UserUrl
     * @example
     * // Get one UserUrl
     * const userUrl = await prisma.userUrl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserUrlFindUniqueOrThrowArgs>(args: SelectSubset<T, UserUrlFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserUrl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUrlFindFirstArgs} args - Arguments to find a UserUrl
     * @example
     * // Get one UserUrl
     * const userUrl = await prisma.userUrl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserUrlFindFirstArgs>(args?: SelectSubset<T, UserUrlFindFirstArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserUrl that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUrlFindFirstOrThrowArgs} args - Arguments to find a UserUrl
     * @example
     * // Get one UserUrl
     * const userUrl = await prisma.userUrl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserUrlFindFirstOrThrowArgs>(args?: SelectSubset<T, UserUrlFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserUrls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUrlFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserUrls
     * const userUrls = await prisma.userUrl.findMany()
     * 
     * // Get first 10 UserUrls
     * const userUrls = await prisma.userUrl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userUrlWithIdOnly = await prisma.userUrl.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserUrlFindManyArgs>(args?: SelectSubset<T, UserUrlFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserUrl.
     * @param {UserUrlCreateArgs} args - Arguments to create a UserUrl.
     * @example
     * // Create one UserUrl
     * const UserUrl = await prisma.userUrl.create({
     *   data: {
     *     // ... data to create a UserUrl
     *   }
     * })
     * 
     */
    create<T extends UserUrlCreateArgs>(args: SelectSubset<T, UserUrlCreateArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserUrls.
     * @param {UserUrlCreateManyArgs} args - Arguments to create many UserUrls.
     * @example
     * // Create many UserUrls
     * const userUrl = await prisma.userUrl.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserUrlCreateManyArgs>(args?: SelectSubset<T, UserUrlCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserUrls and returns the data saved in the database.
     * @param {UserUrlCreateManyAndReturnArgs} args - Arguments to create many UserUrls.
     * @example
     * // Create many UserUrls
     * const userUrl = await prisma.userUrl.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserUrls and only return the `id`
     * const userUrlWithIdOnly = await prisma.userUrl.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserUrlCreateManyAndReturnArgs>(args?: SelectSubset<T, UserUrlCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserUrl.
     * @param {UserUrlDeleteArgs} args - Arguments to delete one UserUrl.
     * @example
     * // Delete one UserUrl
     * const UserUrl = await prisma.userUrl.delete({
     *   where: {
     *     // ... filter to delete one UserUrl
     *   }
     * })
     * 
     */
    delete<T extends UserUrlDeleteArgs>(args: SelectSubset<T, UserUrlDeleteArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserUrl.
     * @param {UserUrlUpdateArgs} args - Arguments to update one UserUrl.
     * @example
     * // Update one UserUrl
     * const userUrl = await prisma.userUrl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUrlUpdateArgs>(args: SelectSubset<T, UserUrlUpdateArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserUrls.
     * @param {UserUrlDeleteManyArgs} args - Arguments to filter UserUrls to delete.
     * @example
     * // Delete a few UserUrls
     * const { count } = await prisma.userUrl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserUrlDeleteManyArgs>(args?: SelectSubset<T, UserUrlDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserUrls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUrlUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserUrls
     * const userUrl = await prisma.userUrl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUrlUpdateManyArgs>(args: SelectSubset<T, UserUrlUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserUrls and returns the data updated in the database.
     * @param {UserUrlUpdateManyAndReturnArgs} args - Arguments to update many UserUrls.
     * @example
     * // Update many UserUrls
     * const userUrl = await prisma.userUrl.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserUrls and only return the `id`
     * const userUrlWithIdOnly = await prisma.userUrl.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUrlUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUrlUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserUrl.
     * @param {UserUrlUpsertArgs} args - Arguments to update or create a UserUrl.
     * @example
     * // Update or create a UserUrl
     * const userUrl = await prisma.userUrl.upsert({
     *   create: {
     *     // ... data to create a UserUrl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserUrl we want to update
     *   }
     * })
     */
    upsert<T extends UserUrlUpsertArgs>(args: SelectSubset<T, UserUrlUpsertArgs<ExtArgs>>): Prisma__UserUrlClient<$Result.GetResult<Prisma.$UserUrlPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserUrls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUrlCountArgs} args - Arguments to filter UserUrls to count.
     * @example
     * // Count the number of UserUrls
     * const count = await prisma.userUrl.count({
     *   where: {
     *     // ... the filter for the UserUrls we want to count
     *   }
     * })
    **/
    count<T extends UserUrlCountArgs>(
      args?: Subset<T, UserUrlCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserUrlCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserUrl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUrlAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserUrlAggregateArgs>(args: Subset<T, UserUrlAggregateArgs>): Prisma.PrismaPromise<GetUserUrlAggregateType<T>>

    /**
     * Group by UserUrl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUrlGroupByArgs} args - Group by arguments.
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
      T extends UserUrlGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserUrlGroupByArgs['orderBy'] }
        : { orderBy?: UserUrlGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserUrlGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserUrlGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserUrl model
   */
  readonly fields: UserUrlFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserUrl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserUrlClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserUrl$userArgs<ExtArgs> = {}>(args?: Subset<T, UserUrl$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserUrl model
   */
  interface UserUrlFieldRefs {
    readonly id: FieldRef<"UserUrl", 'String'>
    readonly url: FieldRef<"UserUrl", 'String'>
    readonly userId: FieldRef<"UserUrl", 'String'>
    readonly urlType: FieldRef<"UserUrl", 'UrlType'>
    readonly createdAt: FieldRef<"UserUrl", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserUrl findUnique
   */
  export type UserUrlFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * Filter, which UserUrl to fetch.
     */
    where: UserUrlWhereUniqueInput
  }

  /**
   * UserUrl findUniqueOrThrow
   */
  export type UserUrlFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * Filter, which UserUrl to fetch.
     */
    where: UserUrlWhereUniqueInput
  }

  /**
   * UserUrl findFirst
   */
  export type UserUrlFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * Filter, which UserUrl to fetch.
     */
    where?: UserUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserUrls to fetch.
     */
    orderBy?: UserUrlOrderByWithRelationInput | UserUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserUrls.
     */
    cursor?: UserUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserUrls.
     */
    distinct?: UserUrlScalarFieldEnum | UserUrlScalarFieldEnum[]
  }

  /**
   * UserUrl findFirstOrThrow
   */
  export type UserUrlFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * Filter, which UserUrl to fetch.
     */
    where?: UserUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserUrls to fetch.
     */
    orderBy?: UserUrlOrderByWithRelationInput | UserUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserUrls.
     */
    cursor?: UserUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserUrls.
     */
    distinct?: UserUrlScalarFieldEnum | UserUrlScalarFieldEnum[]
  }

  /**
   * UserUrl findMany
   */
  export type UserUrlFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * Filter, which UserUrls to fetch.
     */
    where?: UserUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserUrls to fetch.
     */
    orderBy?: UserUrlOrderByWithRelationInput | UserUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserUrls.
     */
    cursor?: UserUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserUrls.
     */
    skip?: number
    distinct?: UserUrlScalarFieldEnum | UserUrlScalarFieldEnum[]
  }

  /**
   * UserUrl create
   */
  export type UserUrlCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * The data needed to create a UserUrl.
     */
    data: XOR<UserUrlCreateInput, UserUrlUncheckedCreateInput>
  }

  /**
   * UserUrl createMany
   */
  export type UserUrlCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserUrls.
     */
    data: UserUrlCreateManyInput | UserUrlCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserUrl createManyAndReturn
   */
  export type UserUrlCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * The data used to create many UserUrls.
     */
    data: UserUrlCreateManyInput | UserUrlCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserUrl update
   */
  export type UserUrlUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * The data needed to update a UserUrl.
     */
    data: XOR<UserUrlUpdateInput, UserUrlUncheckedUpdateInput>
    /**
     * Choose, which UserUrl to update.
     */
    where: UserUrlWhereUniqueInput
  }

  /**
   * UserUrl updateMany
   */
  export type UserUrlUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserUrls.
     */
    data: XOR<UserUrlUpdateManyMutationInput, UserUrlUncheckedUpdateManyInput>
    /**
     * Filter which UserUrls to update
     */
    where?: UserUrlWhereInput
    /**
     * Limit how many UserUrls to update.
     */
    limit?: number
  }

  /**
   * UserUrl updateManyAndReturn
   */
  export type UserUrlUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * The data used to update UserUrls.
     */
    data: XOR<UserUrlUpdateManyMutationInput, UserUrlUncheckedUpdateManyInput>
    /**
     * Filter which UserUrls to update
     */
    where?: UserUrlWhereInput
    /**
     * Limit how many UserUrls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserUrl upsert
   */
  export type UserUrlUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * The filter to search for the UserUrl to update in case it exists.
     */
    where: UserUrlWhereUniqueInput
    /**
     * In case the UserUrl found by the `where` argument doesn't exist, create a new UserUrl with this data.
     */
    create: XOR<UserUrlCreateInput, UserUrlUncheckedCreateInput>
    /**
     * In case the UserUrl was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUrlUpdateInput, UserUrlUncheckedUpdateInput>
  }

  /**
   * UserUrl delete
   */
  export type UserUrlDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
    /**
     * Filter which UserUrl to delete.
     */
    where: UserUrlWhereUniqueInput
  }

  /**
   * UserUrl deleteMany
   */
  export type UserUrlDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserUrls to delete
     */
    where?: UserUrlWhereInput
    /**
     * Limit how many UserUrls to delete.
     */
    limit?: number
  }

  /**
   * UserUrl.user
   */
  export type UserUrl$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * UserUrl without action
   */
  export type UserUrlDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserUrl
     */
    select?: UserUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserUrl
     */
    omit?: UserUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserUrlInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AppFileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    filename: 'filename',
    documentType: 'documentType',
    mimetype: 'mimetype',
    url: 'url',
    uploadedAt: 'uploadedAt',
    workType: 'workType',
    wordCount: 'wordCount',
    pageCount: 'pageCount',
    genre: 'genre',
    manuscriptIsVisible: 'manuscriptIsVisible'
  };

  export type AppFileScalarFieldEnum = (typeof AppFileScalarFieldEnum)[keyof typeof AppFileScalarFieldEnum]


  export const ReadingScalarFieldEnum: {
    id: 'id',
    name: 'name',
    groupId: 'groupId',
    createdAt: 'createdAt',
    createdUserId: 'createdUserId',
    readingDate: 'readingDate',
    readingStartTime: 'readingStartTime',
    readingEndTime: 'readingEndTime',
    readingAddressId: 'readingAddressId',
    submissionDeadline: 'submissionDeadline',
    description: 'description',
    minDaysBetweenReads: 'minDaysBetweenReads',
    maxConsecutiveReads: 'maxConsecutiveReads'
  };

  export type ReadingScalarFieldEnum = (typeof ReadingScalarFieldEnum)[keyof typeof ReadingScalarFieldEnum]


  export const ReadingAuthorScalarFieldEnum: {
    id: 'id',
    readingId: 'readingId',
    authorId: 'authorId',
    joinedAt: 'joinedAt'
  };

  export type ReadingAuthorScalarFieldEnum = (typeof ReadingAuthorScalarFieldEnum)[keyof typeof ReadingAuthorScalarFieldEnum]


  export const ReadingFeedbackScalarFieldEnum: {
    id: 'id',
    readingManuscriptId: 'readingManuscriptId',
    feedbackFileId: 'feedbackFileId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReadingFeedbackScalarFieldEnum = (typeof ReadingFeedbackScalarFieldEnum)[keyof typeof ReadingFeedbackScalarFieldEnum]


  export const ReadingManuscriptScalarFieldEnum: {
    id: 'id',
    readingId: 'readingId',
    readingAuthorId: 'readingAuthorId',
    appFileId: 'appFileId'
  };

  export type ReadingManuscriptScalarFieldEnum = (typeof ReadingManuscriptScalarFieldEnum)[keyof typeof ReadingManuscriptScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    creatorUserId: 'creatorUserId',
    groupType: 'groupType',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    websiteUrl: 'websiteUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const GroupAddressScalarFieldEnum: {
    id: 'id',
    street: 'street',
    city: 'city',
    state: 'state',
    zip: 'zip',
    groupId: 'groupId'
  };

  export type GroupAddressScalarFieldEnum = (typeof GroupAddressScalarFieldEnum)[keyof typeof GroupAddressScalarFieldEnum]


  export const GroupNewsScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    title: 'title',
    content: 'content',
    postedAt: 'postedAt',
    archived: 'archived'
  };

  export type GroupNewsScalarFieldEnum = (typeof GroupNewsScalarFieldEnum)[keyof typeof GroupNewsScalarFieldEnum]


  export const GroupUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    groupId: 'groupId',
    isAdmin: 'isAdmin',
    invitedBy: 'invitedBy',
    createdAt: 'createdAt'
  };

  export type GroupUserScalarFieldEnum = (typeof GroupUserScalarFieldEnum)[keyof typeof GroupUserScalarFieldEnum]


  export const GroupUrlScalarFieldEnum: {
    id: 'id',
    url: 'url',
    groupId: 'groupId',
    urlType: 'urlType',
    createdAt: 'createdAt'
  };

  export type GroupUrlScalarFieldEnum = (typeof GroupUrlScalarFieldEnum)[keyof typeof GroupUrlScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    superTokensId: 'superTokensId',
    email: 'email',
    role: 'role',
    username: 'username',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    bio: 'bio'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const UserUrlScalarFieldEnum: {
    id: 'id',
    url: 'url',
    userId: 'userId',
    urlType: 'urlType',
    createdAt: 'createdAt'
  };

  export type UserUrlScalarFieldEnum = (typeof UserUrlScalarFieldEnum)[keyof typeof UserUrlScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    


  /**
   * Reference to a field of type 'FileType'
   */
  export type EnumFileTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileType'>
    


  /**
   * Reference to a field of type 'FileType[]'
   */
  export type ListEnumFileTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'WorkType'
   */
  export type EnumWorkTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkType'>
    


  /**
   * Reference to a field of type 'WorkType[]'
   */
  export type ListEnumWorkTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Genre'
   */
  export type EnumGenreFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Genre'>
    


  /**
   * Reference to a field of type 'Genre[]'
   */
  export type ListEnumGenreFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Genre[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'GroupType'
   */
  export type EnumGroupTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupType'>
    


  /**
   * Reference to a field of type 'GroupType[]'
   */
  export type ListEnumGroupTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupType[]'>
    


  /**
   * Reference to a field of type 'UrlType'
   */
  export type EnumUrlTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UrlType'>
    


  /**
   * Reference to a field of type 'UrlType[]'
   */
  export type ListEnumUrlTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UrlType[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AppFileWhereInput = {
    AND?: AppFileWhereInput | AppFileWhereInput[]
    OR?: AppFileWhereInput[]
    NOT?: AppFileWhereInput | AppFileWhereInput[]
    id?: StringFilter<"AppFile"> | string
    userId?: StringFilter<"AppFile"> | string
    title?: StringFilter<"AppFile"> | string
    description?: StringNullableFilter<"AppFile"> | string | null
    filename?: StringFilter<"AppFile"> | string
    documentType?: EnumDocumentTypeFilter<"AppFile"> | $Enums.DocumentType
    mimetype?: EnumFileTypeFilter<"AppFile"> | $Enums.FileType
    url?: StringFilter<"AppFile"> | string
    uploadedAt?: DateTimeFilter<"AppFile"> | Date | string
    workType?: EnumWorkTypeNullableFilter<"AppFile"> | $Enums.WorkType | null
    wordCount?: IntNullableFilter<"AppFile"> | number | null
    pageCount?: IntNullableFilter<"AppFile"> | number | null
    genre?: EnumGenreNullableFilter<"AppFile"> | $Enums.Genre | null
    manuscriptIsVisible?: BoolFilter<"AppFile"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingManuscripts?: ReadingManuscriptListRelationFilter
    readingFeedback?: ReadingFeedbackListRelationFilter
  }

  export type AppFileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    filename?: SortOrder
    documentType?: SortOrder
    mimetype?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    workType?: SortOrderInput | SortOrder
    wordCount?: SortOrderInput | SortOrder
    pageCount?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    manuscriptIsVisible?: SortOrder
    user?: UserOrderByWithRelationInput
    readingManuscripts?: ReadingManuscriptOrderByRelationAggregateInput
    readingFeedback?: ReadingFeedbackOrderByRelationAggregateInput
  }

  export type AppFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppFileWhereInput | AppFileWhereInput[]
    OR?: AppFileWhereInput[]
    NOT?: AppFileWhereInput | AppFileWhereInput[]
    userId?: StringFilter<"AppFile"> | string
    title?: StringFilter<"AppFile"> | string
    description?: StringNullableFilter<"AppFile"> | string | null
    filename?: StringFilter<"AppFile"> | string
    documentType?: EnumDocumentTypeFilter<"AppFile"> | $Enums.DocumentType
    mimetype?: EnumFileTypeFilter<"AppFile"> | $Enums.FileType
    url?: StringFilter<"AppFile"> | string
    uploadedAt?: DateTimeFilter<"AppFile"> | Date | string
    workType?: EnumWorkTypeNullableFilter<"AppFile"> | $Enums.WorkType | null
    wordCount?: IntNullableFilter<"AppFile"> | number | null
    pageCount?: IntNullableFilter<"AppFile"> | number | null
    genre?: EnumGenreNullableFilter<"AppFile"> | $Enums.Genre | null
    manuscriptIsVisible?: BoolFilter<"AppFile"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingManuscripts?: ReadingManuscriptListRelationFilter
    readingFeedback?: ReadingFeedbackListRelationFilter
  }, "id">

  export type AppFileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    filename?: SortOrder
    documentType?: SortOrder
    mimetype?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    workType?: SortOrderInput | SortOrder
    wordCount?: SortOrderInput | SortOrder
    pageCount?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    manuscriptIsVisible?: SortOrder
    _count?: AppFileCountOrderByAggregateInput
    _avg?: AppFileAvgOrderByAggregateInput
    _max?: AppFileMaxOrderByAggregateInput
    _min?: AppFileMinOrderByAggregateInput
    _sum?: AppFileSumOrderByAggregateInput
  }

  export type AppFileScalarWhereWithAggregatesInput = {
    AND?: AppFileScalarWhereWithAggregatesInput | AppFileScalarWhereWithAggregatesInput[]
    OR?: AppFileScalarWhereWithAggregatesInput[]
    NOT?: AppFileScalarWhereWithAggregatesInput | AppFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppFile"> | string
    userId?: StringWithAggregatesFilter<"AppFile"> | string
    title?: StringWithAggregatesFilter<"AppFile"> | string
    description?: StringNullableWithAggregatesFilter<"AppFile"> | string | null
    filename?: StringWithAggregatesFilter<"AppFile"> | string
    documentType?: EnumDocumentTypeWithAggregatesFilter<"AppFile"> | $Enums.DocumentType
    mimetype?: EnumFileTypeWithAggregatesFilter<"AppFile"> | $Enums.FileType
    url?: StringWithAggregatesFilter<"AppFile"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"AppFile"> | Date | string
    workType?: EnumWorkTypeNullableWithAggregatesFilter<"AppFile"> | $Enums.WorkType | null
    wordCount?: IntNullableWithAggregatesFilter<"AppFile"> | number | null
    pageCount?: IntNullableWithAggregatesFilter<"AppFile"> | number | null
    genre?: EnumGenreNullableWithAggregatesFilter<"AppFile"> | $Enums.Genre | null
    manuscriptIsVisible?: BoolWithAggregatesFilter<"AppFile"> | boolean
  }

  export type ReadingWhereInput = {
    AND?: ReadingWhereInput | ReadingWhereInput[]
    OR?: ReadingWhereInput[]
    NOT?: ReadingWhereInput | ReadingWhereInput[]
    id?: StringFilter<"Reading"> | string
    name?: StringFilter<"Reading"> | string
    groupId?: StringFilter<"Reading"> | string
    createdAt?: DateTimeFilter<"Reading"> | Date | string
    createdUserId?: StringFilter<"Reading"> | string
    readingDate?: DateTimeFilter<"Reading"> | Date | string
    readingStartTime?: StringFilter<"Reading"> | string
    readingEndTime?: StringFilter<"Reading"> | string
    readingAddressId?: StringNullableFilter<"Reading"> | string | null
    submissionDeadline?: DateTimeFilter<"Reading"> | Date | string
    description?: StringFilter<"Reading"> | string
    minDaysBetweenReads?: IntFilter<"Reading"> | number
    maxConsecutiveReads?: IntFilter<"Reading"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingAuthor?: ReadingAuthorListRelationFilter
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    groupAddress?: XOR<GroupAddressNullableScalarRelationFilter, GroupAddressWhereInput> | null
  }

  export type ReadingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    createdUserId?: SortOrder
    readingDate?: SortOrder
    readingStartTime?: SortOrder
    readingEndTime?: SortOrder
    readingAddressId?: SortOrderInput | SortOrder
    submissionDeadline?: SortOrder
    description?: SortOrder
    minDaysBetweenReads?: SortOrder
    maxConsecutiveReads?: SortOrder
    user?: UserOrderByWithRelationInput
    readingAuthor?: ReadingAuthorOrderByRelationAggregateInput
    group?: GroupOrderByWithRelationInput
    groupAddress?: GroupAddressOrderByWithRelationInput
  }

  export type ReadingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    readingAddressId?: string
    AND?: ReadingWhereInput | ReadingWhereInput[]
    OR?: ReadingWhereInput[]
    NOT?: ReadingWhereInput | ReadingWhereInput[]
    name?: StringFilter<"Reading"> | string
    groupId?: StringFilter<"Reading"> | string
    createdAt?: DateTimeFilter<"Reading"> | Date | string
    createdUserId?: StringFilter<"Reading"> | string
    readingDate?: DateTimeFilter<"Reading"> | Date | string
    readingStartTime?: StringFilter<"Reading"> | string
    readingEndTime?: StringFilter<"Reading"> | string
    submissionDeadline?: DateTimeFilter<"Reading"> | Date | string
    description?: StringFilter<"Reading"> | string
    minDaysBetweenReads?: IntFilter<"Reading"> | number
    maxConsecutiveReads?: IntFilter<"Reading"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingAuthor?: ReadingAuthorListRelationFilter
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    groupAddress?: XOR<GroupAddressNullableScalarRelationFilter, GroupAddressWhereInput> | null
  }, "id" | "readingAddressId">

  export type ReadingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    createdUserId?: SortOrder
    readingDate?: SortOrder
    readingStartTime?: SortOrder
    readingEndTime?: SortOrder
    readingAddressId?: SortOrderInput | SortOrder
    submissionDeadline?: SortOrder
    description?: SortOrder
    minDaysBetweenReads?: SortOrder
    maxConsecutiveReads?: SortOrder
    _count?: ReadingCountOrderByAggregateInput
    _avg?: ReadingAvgOrderByAggregateInput
    _max?: ReadingMaxOrderByAggregateInput
    _min?: ReadingMinOrderByAggregateInput
    _sum?: ReadingSumOrderByAggregateInput
  }

  export type ReadingScalarWhereWithAggregatesInput = {
    AND?: ReadingScalarWhereWithAggregatesInput | ReadingScalarWhereWithAggregatesInput[]
    OR?: ReadingScalarWhereWithAggregatesInput[]
    NOT?: ReadingScalarWhereWithAggregatesInput | ReadingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reading"> | string
    name?: StringWithAggregatesFilter<"Reading"> | string
    groupId?: StringWithAggregatesFilter<"Reading"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Reading"> | Date | string
    createdUserId?: StringWithAggregatesFilter<"Reading"> | string
    readingDate?: DateTimeWithAggregatesFilter<"Reading"> | Date | string
    readingStartTime?: StringWithAggregatesFilter<"Reading"> | string
    readingEndTime?: StringWithAggregatesFilter<"Reading"> | string
    readingAddressId?: StringNullableWithAggregatesFilter<"Reading"> | string | null
    submissionDeadline?: DateTimeWithAggregatesFilter<"Reading"> | Date | string
    description?: StringWithAggregatesFilter<"Reading"> | string
    minDaysBetweenReads?: IntWithAggregatesFilter<"Reading"> | number
    maxConsecutiveReads?: IntWithAggregatesFilter<"Reading"> | number
  }

  export type ReadingAuthorWhereInput = {
    AND?: ReadingAuthorWhereInput | ReadingAuthorWhereInput[]
    OR?: ReadingAuthorWhereInput[]
    NOT?: ReadingAuthorWhereInput | ReadingAuthorWhereInput[]
    id?: StringFilter<"ReadingAuthor"> | string
    readingId?: StringFilter<"ReadingAuthor"> | string
    authorId?: StringFilter<"ReadingAuthor"> | string
    joinedAt?: DateTimeFilter<"ReadingAuthor"> | Date | string
    reading?: XOR<ReadingScalarRelationFilter, ReadingWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingManuscript?: ReadingManuscriptListRelationFilter
  }

  export type ReadingAuthorOrderByWithRelationInput = {
    id?: SortOrder
    readingId?: SortOrder
    authorId?: SortOrder
    joinedAt?: SortOrder
    reading?: ReadingOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    readingManuscript?: ReadingManuscriptOrderByRelationAggregateInput
  }

  export type ReadingAuthorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    readingId_authorId?: ReadingAuthorReadingIdAuthorIdCompoundUniqueInput
    AND?: ReadingAuthorWhereInput | ReadingAuthorWhereInput[]
    OR?: ReadingAuthorWhereInput[]
    NOT?: ReadingAuthorWhereInput | ReadingAuthorWhereInput[]
    readingId?: StringFilter<"ReadingAuthor"> | string
    authorId?: StringFilter<"ReadingAuthor"> | string
    joinedAt?: DateTimeFilter<"ReadingAuthor"> | Date | string
    reading?: XOR<ReadingScalarRelationFilter, ReadingWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingManuscript?: ReadingManuscriptListRelationFilter
  }, "id" | "readingId_authorId">

  export type ReadingAuthorOrderByWithAggregationInput = {
    id?: SortOrder
    readingId?: SortOrder
    authorId?: SortOrder
    joinedAt?: SortOrder
    _count?: ReadingAuthorCountOrderByAggregateInput
    _max?: ReadingAuthorMaxOrderByAggregateInput
    _min?: ReadingAuthorMinOrderByAggregateInput
  }

  export type ReadingAuthorScalarWhereWithAggregatesInput = {
    AND?: ReadingAuthorScalarWhereWithAggregatesInput | ReadingAuthorScalarWhereWithAggregatesInput[]
    OR?: ReadingAuthorScalarWhereWithAggregatesInput[]
    NOT?: ReadingAuthorScalarWhereWithAggregatesInput | ReadingAuthorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReadingAuthor"> | string
    readingId?: StringWithAggregatesFilter<"ReadingAuthor"> | string
    authorId?: StringWithAggregatesFilter<"ReadingAuthor"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"ReadingAuthor"> | Date | string
  }

  export type ReadingFeedbackWhereInput = {
    AND?: ReadingFeedbackWhereInput | ReadingFeedbackWhereInput[]
    OR?: ReadingFeedbackWhereInput[]
    NOT?: ReadingFeedbackWhereInput | ReadingFeedbackWhereInput[]
    id?: StringFilter<"ReadingFeedback"> | string
    readingManuscriptId?: StringFilter<"ReadingFeedback"> | string
    feedbackFileId?: StringFilter<"ReadingFeedback"> | string
    userId?: StringFilter<"ReadingFeedback"> | string
    createdAt?: DateTimeFilter<"ReadingFeedback"> | Date | string
    updatedAt?: DateTimeFilter<"ReadingFeedback"> | Date | string
    appFile?: XOR<AppFileScalarRelationFilter, AppFileWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingManuscript?: XOR<ReadingManuscriptScalarRelationFilter, ReadingManuscriptWhereInput>
  }

  export type ReadingFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    readingManuscriptId?: SortOrder
    feedbackFileId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    appFile?: AppFileOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    readingManuscript?: ReadingManuscriptOrderByWithRelationInput
  }

  export type ReadingFeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    readingManuscriptId_userId?: ReadingFeedbackReadingManuscriptIdUserIdCompoundUniqueInput
    AND?: ReadingFeedbackWhereInput | ReadingFeedbackWhereInput[]
    OR?: ReadingFeedbackWhereInput[]
    NOT?: ReadingFeedbackWhereInput | ReadingFeedbackWhereInput[]
    readingManuscriptId?: StringFilter<"ReadingFeedback"> | string
    feedbackFileId?: StringFilter<"ReadingFeedback"> | string
    userId?: StringFilter<"ReadingFeedback"> | string
    createdAt?: DateTimeFilter<"ReadingFeedback"> | Date | string
    updatedAt?: DateTimeFilter<"ReadingFeedback"> | Date | string
    appFile?: XOR<AppFileScalarRelationFilter, AppFileWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    readingManuscript?: XOR<ReadingManuscriptScalarRelationFilter, ReadingManuscriptWhereInput>
  }, "id" | "readingManuscriptId_userId">

  export type ReadingFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    readingManuscriptId?: SortOrder
    feedbackFileId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReadingFeedbackCountOrderByAggregateInput
    _max?: ReadingFeedbackMaxOrderByAggregateInput
    _min?: ReadingFeedbackMinOrderByAggregateInput
  }

  export type ReadingFeedbackScalarWhereWithAggregatesInput = {
    AND?: ReadingFeedbackScalarWhereWithAggregatesInput | ReadingFeedbackScalarWhereWithAggregatesInput[]
    OR?: ReadingFeedbackScalarWhereWithAggregatesInput[]
    NOT?: ReadingFeedbackScalarWhereWithAggregatesInput | ReadingFeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReadingFeedback"> | string
    readingManuscriptId?: StringWithAggregatesFilter<"ReadingFeedback"> | string
    feedbackFileId?: StringWithAggregatesFilter<"ReadingFeedback"> | string
    userId?: StringWithAggregatesFilter<"ReadingFeedback"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ReadingFeedback"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReadingFeedback"> | Date | string
  }

  export type ReadingManuscriptWhereInput = {
    AND?: ReadingManuscriptWhereInput | ReadingManuscriptWhereInput[]
    OR?: ReadingManuscriptWhereInput[]
    NOT?: ReadingManuscriptWhereInput | ReadingManuscriptWhereInput[]
    id?: StringFilter<"ReadingManuscript"> | string
    readingId?: StringFilter<"ReadingManuscript"> | string
    readingAuthorId?: StringFilter<"ReadingManuscript"> | string
    appFileId?: StringFilter<"ReadingManuscript"> | string
    readingFeedback?: ReadingFeedbackListRelationFilter
    readingAuthor?: XOR<ReadingAuthorScalarRelationFilter, ReadingAuthorWhereInput>
    appFile?: XOR<AppFileScalarRelationFilter, AppFileWhereInput>
  }

  export type ReadingManuscriptOrderByWithRelationInput = {
    id?: SortOrder
    readingId?: SortOrder
    readingAuthorId?: SortOrder
    appFileId?: SortOrder
    readingFeedback?: ReadingFeedbackOrderByRelationAggregateInput
    readingAuthor?: ReadingAuthorOrderByWithRelationInput
    appFile?: AppFileOrderByWithRelationInput
  }

  export type ReadingManuscriptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    readingAuthorId?: string
    AND?: ReadingManuscriptWhereInput | ReadingManuscriptWhereInput[]
    OR?: ReadingManuscriptWhereInput[]
    NOT?: ReadingManuscriptWhereInput | ReadingManuscriptWhereInput[]
    readingId?: StringFilter<"ReadingManuscript"> | string
    appFileId?: StringFilter<"ReadingManuscript"> | string
    readingFeedback?: ReadingFeedbackListRelationFilter
    readingAuthor?: XOR<ReadingAuthorScalarRelationFilter, ReadingAuthorWhereInput>
    appFile?: XOR<AppFileScalarRelationFilter, AppFileWhereInput>
  }, "id" | "readingAuthorId">

  export type ReadingManuscriptOrderByWithAggregationInput = {
    id?: SortOrder
    readingId?: SortOrder
    readingAuthorId?: SortOrder
    appFileId?: SortOrder
    _count?: ReadingManuscriptCountOrderByAggregateInput
    _max?: ReadingManuscriptMaxOrderByAggregateInput
    _min?: ReadingManuscriptMinOrderByAggregateInput
  }

  export type ReadingManuscriptScalarWhereWithAggregatesInput = {
    AND?: ReadingManuscriptScalarWhereWithAggregatesInput | ReadingManuscriptScalarWhereWithAggregatesInput[]
    OR?: ReadingManuscriptScalarWhereWithAggregatesInput[]
    NOT?: ReadingManuscriptScalarWhereWithAggregatesInput | ReadingManuscriptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReadingManuscript"> | string
    readingId?: StringWithAggregatesFilter<"ReadingManuscript"> | string
    readingAuthorId?: StringWithAggregatesFilter<"ReadingManuscript"> | string
    appFileId?: StringWithAggregatesFilter<"ReadingManuscript"> | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    creatorUserId?: StringFilter<"Group"> | string
    groupType?: EnumGroupTypeFilter<"Group"> | $Enums.GroupType
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    imageUrl?: StringNullableFilter<"Group"> | string | null
    websiteUrl?: StringNullableFilter<"Group"> | string | null
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    groupAddress?: GroupAddressListRelationFilter
    groupUser?: GroupUserListRelationFilter
    groupNews?: GroupNewsListRelationFilter
    reading?: ReadingListRelationFilter
    groupUrl?: GroupUrlListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    creatorUserId?: SortOrder
    groupType?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupAddress?: GroupAddressOrderByRelationAggregateInput
    groupUser?: GroupUserOrderByRelationAggregateInput
    groupNews?: GroupNewsOrderByRelationAggregateInput
    reading?: ReadingOrderByRelationAggregateInput
    groupUrl?: GroupUrlOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    creatorUserId?: StringFilter<"Group"> | string
    groupType?: EnumGroupTypeFilter<"Group"> | $Enums.GroupType
    description?: StringNullableFilter<"Group"> | string | null
    imageUrl?: StringNullableFilter<"Group"> | string | null
    websiteUrl?: StringNullableFilter<"Group"> | string | null
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    groupAddress?: GroupAddressListRelationFilter
    groupUser?: GroupUserListRelationFilter
    groupNews?: GroupNewsListRelationFilter
    reading?: ReadingListRelationFilter
    groupUrl?: GroupUrlListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "name">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    creatorUserId?: SortOrder
    groupType?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    creatorUserId?: StringWithAggregatesFilter<"Group"> | string
    groupType?: EnumGroupTypeWithAggregatesFilter<"Group"> | $Enums.GroupType
    name?: StringWithAggregatesFilter<"Group"> | string
    description?: StringNullableWithAggregatesFilter<"Group"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Group"> | string | null
    websiteUrl?: StringNullableWithAggregatesFilter<"Group"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type GroupAddressWhereInput = {
    AND?: GroupAddressWhereInput | GroupAddressWhereInput[]
    OR?: GroupAddressWhereInput[]
    NOT?: GroupAddressWhereInput | GroupAddressWhereInput[]
    id?: StringFilter<"GroupAddress"> | string
    street?: StringFilter<"GroupAddress"> | string
    city?: StringFilter<"GroupAddress"> | string
    state?: StringFilter<"GroupAddress"> | string
    zip?: StringFilter<"GroupAddress"> | string
    groupId?: StringFilter<"GroupAddress"> | string
    group?: XOR<GroupNullableScalarRelationFilter, GroupWhereInput> | null
    reading?: XOR<ReadingNullableScalarRelationFilter, ReadingWhereInput> | null
  }

  export type GroupAddressOrderByWithRelationInput = {
    id?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    groupId?: SortOrder
    group?: GroupOrderByWithRelationInput
    reading?: ReadingOrderByWithRelationInput
  }

  export type GroupAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupAddressWhereInput | GroupAddressWhereInput[]
    OR?: GroupAddressWhereInput[]
    NOT?: GroupAddressWhereInput | GroupAddressWhereInput[]
    street?: StringFilter<"GroupAddress"> | string
    city?: StringFilter<"GroupAddress"> | string
    state?: StringFilter<"GroupAddress"> | string
    zip?: StringFilter<"GroupAddress"> | string
    groupId?: StringFilter<"GroupAddress"> | string
    group?: XOR<GroupNullableScalarRelationFilter, GroupWhereInput> | null
    reading?: XOR<ReadingNullableScalarRelationFilter, ReadingWhereInput> | null
  }, "id">

  export type GroupAddressOrderByWithAggregationInput = {
    id?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    groupId?: SortOrder
    _count?: GroupAddressCountOrderByAggregateInput
    _max?: GroupAddressMaxOrderByAggregateInput
    _min?: GroupAddressMinOrderByAggregateInput
  }

  export type GroupAddressScalarWhereWithAggregatesInput = {
    AND?: GroupAddressScalarWhereWithAggregatesInput | GroupAddressScalarWhereWithAggregatesInput[]
    OR?: GroupAddressScalarWhereWithAggregatesInput[]
    NOT?: GroupAddressScalarWhereWithAggregatesInput | GroupAddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupAddress"> | string
    street?: StringWithAggregatesFilter<"GroupAddress"> | string
    city?: StringWithAggregatesFilter<"GroupAddress"> | string
    state?: StringWithAggregatesFilter<"GroupAddress"> | string
    zip?: StringWithAggregatesFilter<"GroupAddress"> | string
    groupId?: StringWithAggregatesFilter<"GroupAddress"> | string
  }

  export type GroupNewsWhereInput = {
    AND?: GroupNewsWhereInput | GroupNewsWhereInput[]
    OR?: GroupNewsWhereInput[]
    NOT?: GroupNewsWhereInput | GroupNewsWhereInput[]
    id?: StringFilter<"GroupNews"> | string
    groupId?: StringFilter<"GroupNews"> | string
    title?: StringFilter<"GroupNews"> | string
    content?: StringNullableFilter<"GroupNews"> | string | null
    postedAt?: DateTimeFilter<"GroupNews"> | Date | string
    archived?: BoolFilter<"GroupNews"> | boolean
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type GroupNewsOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    postedAt?: SortOrder
    archived?: SortOrder
    group?: GroupOrderByWithRelationInput
  }

  export type GroupNewsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupNewsWhereInput | GroupNewsWhereInput[]
    OR?: GroupNewsWhereInput[]
    NOT?: GroupNewsWhereInput | GroupNewsWhereInput[]
    groupId?: StringFilter<"GroupNews"> | string
    title?: StringFilter<"GroupNews"> | string
    content?: StringNullableFilter<"GroupNews"> | string | null
    postedAt?: DateTimeFilter<"GroupNews"> | Date | string
    archived?: BoolFilter<"GroupNews"> | boolean
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "id">

  export type GroupNewsOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    postedAt?: SortOrder
    archived?: SortOrder
    _count?: GroupNewsCountOrderByAggregateInput
    _max?: GroupNewsMaxOrderByAggregateInput
    _min?: GroupNewsMinOrderByAggregateInput
  }

  export type GroupNewsScalarWhereWithAggregatesInput = {
    AND?: GroupNewsScalarWhereWithAggregatesInput | GroupNewsScalarWhereWithAggregatesInput[]
    OR?: GroupNewsScalarWhereWithAggregatesInput[]
    NOT?: GroupNewsScalarWhereWithAggregatesInput | GroupNewsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupNews"> | string
    groupId?: StringWithAggregatesFilter<"GroupNews"> | string
    title?: StringWithAggregatesFilter<"GroupNews"> | string
    content?: StringNullableWithAggregatesFilter<"GroupNews"> | string | null
    postedAt?: DateTimeWithAggregatesFilter<"GroupNews"> | Date | string
    archived?: BoolWithAggregatesFilter<"GroupNews"> | boolean
  }

  export type GroupUserWhereInput = {
    AND?: GroupUserWhereInput | GroupUserWhereInput[]
    OR?: GroupUserWhereInput[]
    NOT?: GroupUserWhereInput | GroupUserWhereInput[]
    id?: StringFilter<"GroupUser"> | string
    userId?: StringFilter<"GroupUser"> | string
    groupId?: StringFilter<"GroupUser"> | string
    isAdmin?: BoolFilter<"GroupUser"> | boolean
    invitedBy?: StringNullableFilter<"GroupUser"> | string | null
    createdAt?: DateTimeFilter<"GroupUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type GroupUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    isAdmin?: SortOrder
    invitedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
  }

  export type GroupUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    groupId_userId?: GroupUserGroupIdUserIdCompoundUniqueInput
    AND?: GroupUserWhereInput | GroupUserWhereInput[]
    OR?: GroupUserWhereInput[]
    NOT?: GroupUserWhereInput | GroupUserWhereInput[]
    userId?: StringFilter<"GroupUser"> | string
    groupId?: StringFilter<"GroupUser"> | string
    isAdmin?: BoolFilter<"GroupUser"> | boolean
    invitedBy?: StringNullableFilter<"GroupUser"> | string | null
    createdAt?: DateTimeFilter<"GroupUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "id" | "groupId_userId">

  export type GroupUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    isAdmin?: SortOrder
    invitedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GroupUserCountOrderByAggregateInput
    _max?: GroupUserMaxOrderByAggregateInput
    _min?: GroupUserMinOrderByAggregateInput
  }

  export type GroupUserScalarWhereWithAggregatesInput = {
    AND?: GroupUserScalarWhereWithAggregatesInput | GroupUserScalarWhereWithAggregatesInput[]
    OR?: GroupUserScalarWhereWithAggregatesInput[]
    NOT?: GroupUserScalarWhereWithAggregatesInput | GroupUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupUser"> | string
    userId?: StringWithAggregatesFilter<"GroupUser"> | string
    groupId?: StringWithAggregatesFilter<"GroupUser"> | string
    isAdmin?: BoolWithAggregatesFilter<"GroupUser"> | boolean
    invitedBy?: StringNullableWithAggregatesFilter<"GroupUser"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GroupUser"> | Date | string
  }

  export type GroupUrlWhereInput = {
    AND?: GroupUrlWhereInput | GroupUrlWhereInput[]
    OR?: GroupUrlWhereInput[]
    NOT?: GroupUrlWhereInput | GroupUrlWhereInput[]
    id?: StringFilter<"GroupUrl"> | string
    url?: StringFilter<"GroupUrl"> | string
    groupId?: StringFilter<"GroupUrl"> | string
    urlType?: EnumUrlTypeFilter<"GroupUrl"> | $Enums.UrlType
    createdAt?: DateTimeFilter<"GroupUrl"> | Date | string
    group?: XOR<GroupNullableScalarRelationFilter, GroupWhereInput> | null
  }

  export type GroupUrlOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    groupId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
    group?: GroupOrderByWithRelationInput
  }

  export type GroupUrlWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupUrlWhereInput | GroupUrlWhereInput[]
    OR?: GroupUrlWhereInput[]
    NOT?: GroupUrlWhereInput | GroupUrlWhereInput[]
    url?: StringFilter<"GroupUrl"> | string
    groupId?: StringFilter<"GroupUrl"> | string
    urlType?: EnumUrlTypeFilter<"GroupUrl"> | $Enums.UrlType
    createdAt?: DateTimeFilter<"GroupUrl"> | Date | string
    group?: XOR<GroupNullableScalarRelationFilter, GroupWhereInput> | null
  }, "id">

  export type GroupUrlOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    groupId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
    _count?: GroupUrlCountOrderByAggregateInput
    _max?: GroupUrlMaxOrderByAggregateInput
    _min?: GroupUrlMinOrderByAggregateInput
  }

  export type GroupUrlScalarWhereWithAggregatesInput = {
    AND?: GroupUrlScalarWhereWithAggregatesInput | GroupUrlScalarWhereWithAggregatesInput[]
    OR?: GroupUrlScalarWhereWithAggregatesInput[]
    NOT?: GroupUrlScalarWhereWithAggregatesInput | GroupUrlScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupUrl"> | string
    url?: StringWithAggregatesFilter<"GroupUrl"> | string
    groupId?: StringWithAggregatesFilter<"GroupUrl"> | string
    urlType?: EnumUrlTypeWithAggregatesFilter<"GroupUrl"> | $Enums.UrlType
    createdAt?: DateTimeWithAggregatesFilter<"GroupUrl"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    superTokensId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    username?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    groupUser?: GroupUserListRelationFilter
    group?: GroupListRelationFilter
    reading?: ReadingListRelationFilter
    userProfile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    appFiles?: AppFileListRelationFilter
    urls?: UserUrlListRelationFilter
    readingAuthor?: ReadingAuthorListRelationFilter
    readingFeedback?: ReadingFeedbackListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    superTokensId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupUser?: GroupUserOrderByRelationAggregateInput
    group?: GroupOrderByRelationAggregateInput
    reading?: ReadingOrderByRelationAggregateInput
    userProfile?: UserProfileOrderByWithRelationInput
    appFiles?: AppFileOrderByRelationAggregateInput
    urls?: UserUrlOrderByRelationAggregateInput
    readingAuthor?: ReadingAuthorOrderByRelationAggregateInput
    readingFeedback?: ReadingFeedbackOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    superTokensId?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    groupUser?: GroupUserListRelationFilter
    group?: GroupListRelationFilter
    reading?: ReadingListRelationFilter
    userProfile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    appFiles?: AppFileListRelationFilter
    urls?: UserUrlListRelationFilter
    readingAuthor?: ReadingAuthorListRelationFilter
    readingFeedback?: ReadingFeedbackListRelationFilter
  }, "id" | "superTokensId" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    superTokensId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    superTokensId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    username?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: StringFilter<"UserProfile"> | string
    userId?: StringFilter<"UserProfile"> | string
    firstName?: StringNullableFilter<"UserProfile"> | string | null
    lastName?: StringNullableFilter<"UserProfile"> | string | null
    phone?: StringNullableFilter<"UserProfile"> | string | null
    bio?: StringNullableFilter<"UserProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    firstName?: StringNullableFilter<"UserProfile"> | string | null
    lastName?: StringNullableFilter<"UserProfile"> | string | null
    phone?: StringNullableFilter<"UserProfile"> | string | null
    bio?: StringNullableFilter<"UserProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProfile"> | string
    userId?: StringWithAggregatesFilter<"UserProfile"> | string
    firstName?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
  }

  export type UserUrlWhereInput = {
    AND?: UserUrlWhereInput | UserUrlWhereInput[]
    OR?: UserUrlWhereInput[]
    NOT?: UserUrlWhereInput | UserUrlWhereInput[]
    id?: StringFilter<"UserUrl"> | string
    url?: StringFilter<"UserUrl"> | string
    userId?: StringFilter<"UserUrl"> | string
    urlType?: EnumUrlTypeFilter<"UserUrl"> | $Enums.UrlType
    createdAt?: DateTimeFilter<"UserUrl"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type UserUrlOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserUrlWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserUrlWhereInput | UserUrlWhereInput[]
    OR?: UserUrlWhereInput[]
    NOT?: UserUrlWhereInput | UserUrlWhereInput[]
    url?: StringFilter<"UserUrl"> | string
    userId?: StringFilter<"UserUrl"> | string
    urlType?: EnumUrlTypeFilter<"UserUrl"> | $Enums.UrlType
    createdAt?: DateTimeFilter<"UserUrl"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type UserUrlOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
    _count?: UserUrlCountOrderByAggregateInput
    _max?: UserUrlMaxOrderByAggregateInput
    _min?: UserUrlMinOrderByAggregateInput
  }

  export type UserUrlScalarWhereWithAggregatesInput = {
    AND?: UserUrlScalarWhereWithAggregatesInput | UserUrlScalarWhereWithAggregatesInput[]
    OR?: UserUrlScalarWhereWithAggregatesInput[]
    NOT?: UserUrlScalarWhereWithAggregatesInput | UserUrlScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserUrl"> | string
    url?: StringWithAggregatesFilter<"UserUrl"> | string
    userId?: StringWithAggregatesFilter<"UserUrl"> | string
    urlType?: EnumUrlTypeWithAggregatesFilter<"UserUrl"> | $Enums.UrlType
    createdAt?: DateTimeWithAggregatesFilter<"UserUrl"> | Date | string
  }

  export type AppFileCreateInput = {
    id?: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    user: UserCreateNestedOneWithoutAppFilesInput
    readingManuscripts?: ReadingManuscriptCreateNestedManyWithoutAppFileInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutAppFileInput
  }

  export type AppFileUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    readingManuscripts?: ReadingManuscriptUncheckedCreateNestedManyWithoutAppFileInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutAppFileInput
  }

  export type AppFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAppFilesNestedInput
    readingManuscripts?: ReadingManuscriptUpdateManyWithoutAppFileNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutAppFileNestedInput
  }

  export type AppFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    readingManuscripts?: ReadingManuscriptUncheckedUpdateManyWithoutAppFileNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutAppFileNestedInput
  }

  export type AppFileCreateManyInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
  }

  export type AppFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AppFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReadingCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    user: UserCreateNestedOneWithoutReadingInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutReadingInput
    group: GroupCreateNestedOneWithoutReadingInput
    groupAddress?: GroupAddressCreateNestedOneWithoutReadingInput
  }

  export type ReadingUncheckedCreateInput = {
    id?: string
    name: string
    groupId: string
    createdAt?: Date | string
    createdUserId: string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    readingAddressId?: string | null
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutReadingInput
  }

  export type ReadingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutReadingNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutReadingNestedInput
    group?: GroupUpdateOneRequiredWithoutReadingNestedInput
    groupAddress?: GroupAddressUpdateOneWithoutReadingNestedInput
  }

  export type ReadingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUserId?: StringFieldUpdateOperationsInput | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    readingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutReadingNestedInput
  }

  export type ReadingCreateManyInput = {
    id?: string
    name: string
    groupId: string
    createdAt?: Date | string
    createdUserId: string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    readingAddressId?: string | null
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
  }

  export type ReadingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
  }

  export type ReadingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUserId?: StringFieldUpdateOperationsInput | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    readingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
  }

  export type ReadingAuthorCreateInput = {
    id?: string
    joinedAt?: Date | string
    reading: ReadingCreateNestedOneWithoutReadingAuthorInput
    user: UserCreateNestedOneWithoutReadingAuthorInput
    readingManuscript?: ReadingManuscriptCreateNestedManyWithoutReadingAuthorInput
  }

  export type ReadingAuthorUncheckedCreateInput = {
    id?: string
    readingId: string
    authorId: string
    joinedAt?: Date | string
    readingManuscript?: ReadingManuscriptUncheckedCreateNestedManyWithoutReadingAuthorInput
  }

  export type ReadingAuthorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reading?: ReadingUpdateOneRequiredWithoutReadingAuthorNestedInput
    user?: UserUpdateOneRequiredWithoutReadingAuthorNestedInput
    readingManuscript?: ReadingManuscriptUpdateManyWithoutReadingAuthorNestedInput
  }

  export type ReadingAuthorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingManuscript?: ReadingManuscriptUncheckedUpdateManyWithoutReadingAuthorNestedInput
  }

  export type ReadingAuthorCreateManyInput = {
    id?: string
    readingId: string
    authorId: string
    joinedAt?: Date | string
  }

  export type ReadingAuthorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingAuthorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingFeedbackCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appFile: AppFileCreateNestedOneWithoutReadingFeedbackInput
    user: UserCreateNestedOneWithoutReadingFeedbackInput
    readingManuscript: ReadingManuscriptCreateNestedOneWithoutReadingFeedbackInput
  }

  export type ReadingFeedbackUncheckedCreateInput = {
    id?: string
    readingManuscriptId: string
    feedbackFileId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appFile?: AppFileUpdateOneRequiredWithoutReadingFeedbackNestedInput
    user?: UserUpdateOneRequiredWithoutReadingFeedbackNestedInput
    readingManuscript?: ReadingManuscriptUpdateOneRequiredWithoutReadingFeedbackNestedInput
  }

  export type ReadingFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingManuscriptId?: StringFieldUpdateOperationsInput | string
    feedbackFileId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingFeedbackCreateManyInput = {
    id?: string
    readingManuscriptId: string
    feedbackFileId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingManuscriptId?: StringFieldUpdateOperationsInput | string
    feedbackFileId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingManuscriptCreateInput = {
    id?: string
    readingAuthorId: string
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutReadingManuscriptInput
    readingAuthor: ReadingAuthorCreateNestedOneWithoutReadingManuscriptInput
    appFile: AppFileCreateNestedOneWithoutReadingManuscriptsInput
  }

  export type ReadingManuscriptUncheckedCreateInput = {
    id?: string
    readingId: string
    readingAuthorId: string
    appFileId: string
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutReadingManuscriptInput
  }

  export type ReadingManuscriptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    readingFeedback?: ReadingFeedbackUpdateManyWithoutReadingManuscriptNestedInput
    readingAuthor?: ReadingAuthorUpdateOneRequiredWithoutReadingManuscriptNestedInput
    appFile?: AppFileUpdateOneRequiredWithoutReadingManuscriptsNestedInput
  }

  export type ReadingManuscriptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    appFileId?: StringFieldUpdateOperationsInput | string
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutReadingManuscriptNestedInput
  }

  export type ReadingManuscriptCreateManyInput = {
    id?: string
    readingId: string
    readingAuthorId: string
    appFileId: string
  }

  export type ReadingManuscriptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReadingManuscriptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    appFileId?: StringFieldUpdateOperationsInput | string
  }

  export type GroupCreateInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsCreateNestedManyWithoutGroupInput
    reading?: ReadingCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlCreateNestedManyWithoutGroupInput
    user: UserCreateNestedOneWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    creatorUserId: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressUncheckedCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsUncheckedCreateNestedManyWithoutGroupInput
    reading?: ReadingUncheckedCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUpdateManyWithoutGroupNestedInput
    reading?: ReadingUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUpdateManyWithoutGroupNestedInput
    user?: UserUpdateOneRequiredWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorUserId?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUncheckedUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUncheckedUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUncheckedUpdateManyWithoutGroupNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    creatorUserId: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorUserId?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupAddressCreateInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
    group?: GroupCreateNestedOneWithoutGroupAddressInput
    reading?: ReadingCreateNestedOneWithoutGroupAddressInput
  }

  export type GroupAddressUncheckedCreateInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
    groupId: string
    reading?: ReadingUncheckedCreateNestedOneWithoutGroupAddressInput
  }

  export type GroupAddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneWithoutGroupAddressNestedInput
    reading?: ReadingUpdateOneWithoutGroupAddressNestedInput
  }

  export type GroupAddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    reading?: ReadingUncheckedUpdateOneWithoutGroupAddressNestedInput
  }

  export type GroupAddressCreateManyInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
    groupId: string
  }

  export type GroupAddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type GroupAddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type GroupNewsCreateInput = {
    id?: string
    title: string
    content?: string | null
    postedAt?: Date | string
    archived?: boolean
    group: GroupCreateNestedOneWithoutGroupNewsInput
  }

  export type GroupNewsUncheckedCreateInput = {
    id?: string
    groupId: string
    title: string
    content?: string | null
    postedAt?: Date | string
    archived?: boolean
  }

  export type GroupNewsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupUpdateOneRequiredWithoutGroupNewsNestedInput
  }

  export type GroupNewsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupNewsCreateManyInput = {
    id?: string
    groupId: string
    title: string
    content?: string | null
    postedAt?: Date | string
    archived?: boolean
  }

  export type GroupNewsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupNewsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupUserCreateInput = {
    id?: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutGroupUserInput
    group: GroupCreateNestedOneWithoutGroupUserInput
  }

  export type GroupUserUncheckedCreateInput = {
    id?: string
    userId: string
    groupId: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
  }

  export type GroupUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGroupUserNestedInput
    group?: GroupUpdateOneRequiredWithoutGroupUserNestedInput
  }

  export type GroupUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserCreateManyInput = {
    id?: string
    userId: string
    groupId: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
  }

  export type GroupUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUrlCreateInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
    group?: GroupCreateNestedOneWithoutGroupUrlInput
  }

  export type GroupUrlUncheckedCreateInput = {
    id?: string
    url: string
    groupId: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type GroupUrlUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneWithoutGroupUrlNestedInput
  }

  export type GroupUrlUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUrlCreateManyInput = {
    id?: string
    url: string
    groupId: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type GroupUrlUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUrlUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    group?: GroupCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    group?: GroupUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    bio?: string | null
    user: UserCreateNestedOneWithoutUserProfileInput
  }

  export type UserProfileUncheckedCreateInput = {
    id?: string
    userId: string
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    bio?: string | null
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutUserProfileNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileCreateManyInput = {
    id?: string
    userId: string
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    bio?: string | null
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUrlCreateInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutUrlsInput
  }

  export type UserUrlUncheckedCreateInput = {
    id?: string
    url: string
    userId: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type UserUrlUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutUrlsNestedInput
  }

  export type UserUrlUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUrlCreateManyInput = {
    id?: string
    url: string
    userId: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type UserUrlUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUrlUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type EnumFileTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFileTypeFilter<$PrismaModel> | $Enums.FileType
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumWorkTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkType | EnumWorkTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkTypeNullableFilter<$PrismaModel> | $Enums.WorkType | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumGenreNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableFilter<$PrismaModel> | $Enums.Genre | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReadingManuscriptListRelationFilter = {
    every?: ReadingManuscriptWhereInput
    some?: ReadingManuscriptWhereInput
    none?: ReadingManuscriptWhereInput
  }

  export type ReadingFeedbackListRelationFilter = {
    every?: ReadingFeedbackWhereInput
    some?: ReadingFeedbackWhereInput
    none?: ReadingFeedbackWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReadingManuscriptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReadingFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppFileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    filename?: SortOrder
    documentType?: SortOrder
    mimetype?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    workType?: SortOrder
    wordCount?: SortOrder
    pageCount?: SortOrder
    genre?: SortOrder
    manuscriptIsVisible?: SortOrder
  }

  export type AppFileAvgOrderByAggregateInput = {
    wordCount?: SortOrder
    pageCount?: SortOrder
  }

  export type AppFileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    filename?: SortOrder
    documentType?: SortOrder
    mimetype?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    workType?: SortOrder
    wordCount?: SortOrder
    pageCount?: SortOrder
    genre?: SortOrder
    manuscriptIsVisible?: SortOrder
  }

  export type AppFileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    filename?: SortOrder
    documentType?: SortOrder
    mimetype?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    workType?: SortOrder
    wordCount?: SortOrder
    pageCount?: SortOrder
    genre?: SortOrder
    manuscriptIsVisible?: SortOrder
  }

  export type AppFileSumOrderByAggregateInput = {
    wordCount?: SortOrder
    pageCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type EnumFileTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFileTypeWithAggregatesFilter<$PrismaModel> | $Enums.FileType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileTypeFilter<$PrismaModel>
    _max?: NestedEnumFileTypeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumWorkTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkType | EnumWorkTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.WorkType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumWorkTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumWorkTypeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumGenreNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableWithAggregatesFilter<$PrismaModel> | $Enums.Genre | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenreNullableFilter<$PrismaModel>
    _max?: NestedEnumGenreNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ReadingAuthorListRelationFilter = {
    every?: ReadingAuthorWhereInput
    some?: ReadingAuthorWhereInput
    none?: ReadingAuthorWhereInput
  }

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type GroupAddressNullableScalarRelationFilter = {
    is?: GroupAddressWhereInput | null
    isNot?: GroupAddressWhereInput | null
  }

  export type ReadingAuthorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReadingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    createdUserId?: SortOrder
    readingDate?: SortOrder
    readingStartTime?: SortOrder
    readingEndTime?: SortOrder
    readingAddressId?: SortOrder
    submissionDeadline?: SortOrder
    description?: SortOrder
    minDaysBetweenReads?: SortOrder
    maxConsecutiveReads?: SortOrder
  }

  export type ReadingAvgOrderByAggregateInput = {
    minDaysBetweenReads?: SortOrder
    maxConsecutiveReads?: SortOrder
  }

  export type ReadingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    createdUserId?: SortOrder
    readingDate?: SortOrder
    readingStartTime?: SortOrder
    readingEndTime?: SortOrder
    readingAddressId?: SortOrder
    submissionDeadline?: SortOrder
    description?: SortOrder
    minDaysBetweenReads?: SortOrder
    maxConsecutiveReads?: SortOrder
  }

  export type ReadingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    createdUserId?: SortOrder
    readingDate?: SortOrder
    readingStartTime?: SortOrder
    readingEndTime?: SortOrder
    readingAddressId?: SortOrder
    submissionDeadline?: SortOrder
    description?: SortOrder
    minDaysBetweenReads?: SortOrder
    maxConsecutiveReads?: SortOrder
  }

  export type ReadingSumOrderByAggregateInput = {
    minDaysBetweenReads?: SortOrder
    maxConsecutiveReads?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ReadingScalarRelationFilter = {
    is?: ReadingWhereInput
    isNot?: ReadingWhereInput
  }

  export type ReadingAuthorReadingIdAuthorIdCompoundUniqueInput = {
    readingId: string
    authorId: string
  }

  export type ReadingAuthorCountOrderByAggregateInput = {
    id?: SortOrder
    readingId?: SortOrder
    authorId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ReadingAuthorMaxOrderByAggregateInput = {
    id?: SortOrder
    readingId?: SortOrder
    authorId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ReadingAuthorMinOrderByAggregateInput = {
    id?: SortOrder
    readingId?: SortOrder
    authorId?: SortOrder
    joinedAt?: SortOrder
  }

  export type AppFileScalarRelationFilter = {
    is?: AppFileWhereInput
    isNot?: AppFileWhereInput
  }

  export type ReadingManuscriptScalarRelationFilter = {
    is?: ReadingManuscriptWhereInput
    isNot?: ReadingManuscriptWhereInput
  }

  export type ReadingFeedbackReadingManuscriptIdUserIdCompoundUniqueInput = {
    readingManuscriptId: string
    userId: string
  }

  export type ReadingFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    readingManuscriptId?: SortOrder
    feedbackFileId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReadingFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    readingManuscriptId?: SortOrder
    feedbackFileId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReadingFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    readingManuscriptId?: SortOrder
    feedbackFileId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReadingAuthorScalarRelationFilter = {
    is?: ReadingAuthorWhereInput
    isNot?: ReadingAuthorWhereInput
  }

  export type ReadingManuscriptCountOrderByAggregateInput = {
    id?: SortOrder
    readingId?: SortOrder
    readingAuthorId?: SortOrder
    appFileId?: SortOrder
  }

  export type ReadingManuscriptMaxOrderByAggregateInput = {
    id?: SortOrder
    readingId?: SortOrder
    readingAuthorId?: SortOrder
    appFileId?: SortOrder
  }

  export type ReadingManuscriptMinOrderByAggregateInput = {
    id?: SortOrder
    readingId?: SortOrder
    readingAuthorId?: SortOrder
    appFileId?: SortOrder
  }

  export type EnumGroupTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupType | EnumGroupTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupTypeFilter<$PrismaModel> | $Enums.GroupType
  }

  export type GroupAddressListRelationFilter = {
    every?: GroupAddressWhereInput
    some?: GroupAddressWhereInput
    none?: GroupAddressWhereInput
  }

  export type GroupUserListRelationFilter = {
    every?: GroupUserWhereInput
    some?: GroupUserWhereInput
    none?: GroupUserWhereInput
  }

  export type GroupNewsListRelationFilter = {
    every?: GroupNewsWhereInput
    some?: GroupNewsWhereInput
    none?: GroupNewsWhereInput
  }

  export type ReadingListRelationFilter = {
    every?: ReadingWhereInput
    some?: ReadingWhereInput
    none?: ReadingWhereInput
  }

  export type GroupUrlListRelationFilter = {
    every?: GroupUrlWhereInput
    some?: GroupUrlWhereInput
    none?: GroupUrlWhereInput
  }

  export type GroupAddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupNewsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReadingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupUrlOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    creatorUserId?: SortOrder
    groupType?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    websiteUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorUserId?: SortOrder
    groupType?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    websiteUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    creatorUserId?: SortOrder
    groupType?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    websiteUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGroupTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupType | EnumGroupTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupTypeWithAggregatesFilter<$PrismaModel> | $Enums.GroupType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupTypeFilter<$PrismaModel>
    _max?: NestedEnumGroupTypeFilter<$PrismaModel>
  }

  export type GroupNullableScalarRelationFilter = {
    is?: GroupWhereInput | null
    isNot?: GroupWhereInput | null
  }

  export type ReadingNullableScalarRelationFilter = {
    is?: ReadingWhereInput | null
    isNot?: ReadingWhereInput | null
  }

  export type GroupAddressCountOrderByAggregateInput = {
    id?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    groupId?: SortOrder
  }

  export type GroupAddressMaxOrderByAggregateInput = {
    id?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    groupId?: SortOrder
  }

  export type GroupAddressMinOrderByAggregateInput = {
    id?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    groupId?: SortOrder
  }

  export type GroupNewsCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    archived?: SortOrder
  }

  export type GroupNewsMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    archived?: SortOrder
  }

  export type GroupNewsMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    archived?: SortOrder
  }

  export type GroupUserGroupIdUserIdCompoundUniqueInput = {
    groupId: string
    userId: string
  }

  export type GroupUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    isAdmin?: SortOrder
    invitedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    isAdmin?: SortOrder
    invitedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    isAdmin?: SortOrder
    invitedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumUrlTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UrlType | EnumUrlTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUrlTypeFilter<$PrismaModel> | $Enums.UrlType
  }

  export type GroupUrlCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    groupId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupUrlMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    groupId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupUrlMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    groupId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumUrlTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UrlType | EnumUrlTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUrlTypeWithAggregatesFilter<$PrismaModel> | $Enums.UrlType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUrlTypeFilter<$PrismaModel>
    _max?: NestedEnumUrlTypeFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type UserProfileNullableScalarRelationFilter = {
    is?: UserProfileWhereInput | null
    isNot?: UserProfileWhereInput | null
  }

  export type AppFileListRelationFilter = {
    every?: AppFileWhereInput
    some?: AppFileWhereInput
    none?: AppFileWhereInput
  }

  export type UserUrlListRelationFilter = {
    every?: UserUrlWhereInput
    some?: UserUrlWhereInput
    none?: UserUrlWhereInput
  }

  export type GroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserUrlOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    superTokensId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    superTokensId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    superTokensId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    bio?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    bio?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    bio?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserUrlCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
  }

  export type UserUrlMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
  }

  export type UserUrlMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
    urlType?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutAppFilesInput = {
    create?: XOR<UserCreateWithoutAppFilesInput, UserUncheckedCreateWithoutAppFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppFilesInput
    connect?: UserWhereUniqueInput
  }

  export type ReadingManuscriptCreateNestedManyWithoutAppFileInput = {
    create?: XOR<ReadingManuscriptCreateWithoutAppFileInput, ReadingManuscriptUncheckedCreateWithoutAppFileInput> | ReadingManuscriptCreateWithoutAppFileInput[] | ReadingManuscriptUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutAppFileInput | ReadingManuscriptCreateOrConnectWithoutAppFileInput[]
    createMany?: ReadingManuscriptCreateManyAppFileInputEnvelope
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
  }

  export type ReadingFeedbackCreateNestedManyWithoutAppFileInput = {
    create?: XOR<ReadingFeedbackCreateWithoutAppFileInput, ReadingFeedbackUncheckedCreateWithoutAppFileInput> | ReadingFeedbackCreateWithoutAppFileInput[] | ReadingFeedbackUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutAppFileInput | ReadingFeedbackCreateOrConnectWithoutAppFileInput[]
    createMany?: ReadingFeedbackCreateManyAppFileInputEnvelope
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
  }

  export type ReadingManuscriptUncheckedCreateNestedManyWithoutAppFileInput = {
    create?: XOR<ReadingManuscriptCreateWithoutAppFileInput, ReadingManuscriptUncheckedCreateWithoutAppFileInput> | ReadingManuscriptCreateWithoutAppFileInput[] | ReadingManuscriptUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutAppFileInput | ReadingManuscriptCreateOrConnectWithoutAppFileInput[]
    createMany?: ReadingManuscriptCreateManyAppFileInputEnvelope
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
  }

  export type ReadingFeedbackUncheckedCreateNestedManyWithoutAppFileInput = {
    create?: XOR<ReadingFeedbackCreateWithoutAppFileInput, ReadingFeedbackUncheckedCreateWithoutAppFileInput> | ReadingFeedbackCreateWithoutAppFileInput[] | ReadingFeedbackUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutAppFileInput | ReadingFeedbackCreateOrConnectWithoutAppFileInput[]
    createMany?: ReadingFeedbackCreateManyAppFileInputEnvelope
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type EnumFileTypeFieldUpdateOperationsInput = {
    set?: $Enums.FileType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableEnumWorkTypeFieldUpdateOperationsInput = {
    set?: $Enums.WorkType | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumGenreFieldUpdateOperationsInput = {
    set?: $Enums.Genre | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAppFilesNestedInput = {
    create?: XOR<UserCreateWithoutAppFilesInput, UserUncheckedCreateWithoutAppFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppFilesInput
    upsert?: UserUpsertWithoutAppFilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppFilesInput, UserUpdateWithoutAppFilesInput>, UserUncheckedUpdateWithoutAppFilesInput>
  }

  export type ReadingManuscriptUpdateManyWithoutAppFileNestedInput = {
    create?: XOR<ReadingManuscriptCreateWithoutAppFileInput, ReadingManuscriptUncheckedCreateWithoutAppFileInput> | ReadingManuscriptCreateWithoutAppFileInput[] | ReadingManuscriptUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutAppFileInput | ReadingManuscriptCreateOrConnectWithoutAppFileInput[]
    upsert?: ReadingManuscriptUpsertWithWhereUniqueWithoutAppFileInput | ReadingManuscriptUpsertWithWhereUniqueWithoutAppFileInput[]
    createMany?: ReadingManuscriptCreateManyAppFileInputEnvelope
    set?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    disconnect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    delete?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    update?: ReadingManuscriptUpdateWithWhereUniqueWithoutAppFileInput | ReadingManuscriptUpdateWithWhereUniqueWithoutAppFileInput[]
    updateMany?: ReadingManuscriptUpdateManyWithWhereWithoutAppFileInput | ReadingManuscriptUpdateManyWithWhereWithoutAppFileInput[]
    deleteMany?: ReadingManuscriptScalarWhereInput | ReadingManuscriptScalarWhereInput[]
  }

  export type ReadingFeedbackUpdateManyWithoutAppFileNestedInput = {
    create?: XOR<ReadingFeedbackCreateWithoutAppFileInput, ReadingFeedbackUncheckedCreateWithoutAppFileInput> | ReadingFeedbackCreateWithoutAppFileInput[] | ReadingFeedbackUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutAppFileInput | ReadingFeedbackCreateOrConnectWithoutAppFileInput[]
    upsert?: ReadingFeedbackUpsertWithWhereUniqueWithoutAppFileInput | ReadingFeedbackUpsertWithWhereUniqueWithoutAppFileInput[]
    createMany?: ReadingFeedbackCreateManyAppFileInputEnvelope
    set?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    disconnect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    delete?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    update?: ReadingFeedbackUpdateWithWhereUniqueWithoutAppFileInput | ReadingFeedbackUpdateWithWhereUniqueWithoutAppFileInput[]
    updateMany?: ReadingFeedbackUpdateManyWithWhereWithoutAppFileInput | ReadingFeedbackUpdateManyWithWhereWithoutAppFileInput[]
    deleteMany?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
  }

  export type ReadingManuscriptUncheckedUpdateManyWithoutAppFileNestedInput = {
    create?: XOR<ReadingManuscriptCreateWithoutAppFileInput, ReadingManuscriptUncheckedCreateWithoutAppFileInput> | ReadingManuscriptCreateWithoutAppFileInput[] | ReadingManuscriptUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutAppFileInput | ReadingManuscriptCreateOrConnectWithoutAppFileInput[]
    upsert?: ReadingManuscriptUpsertWithWhereUniqueWithoutAppFileInput | ReadingManuscriptUpsertWithWhereUniqueWithoutAppFileInput[]
    createMany?: ReadingManuscriptCreateManyAppFileInputEnvelope
    set?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    disconnect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    delete?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    update?: ReadingManuscriptUpdateWithWhereUniqueWithoutAppFileInput | ReadingManuscriptUpdateWithWhereUniqueWithoutAppFileInput[]
    updateMany?: ReadingManuscriptUpdateManyWithWhereWithoutAppFileInput | ReadingManuscriptUpdateManyWithWhereWithoutAppFileInput[]
    deleteMany?: ReadingManuscriptScalarWhereInput | ReadingManuscriptScalarWhereInput[]
  }

  export type ReadingFeedbackUncheckedUpdateManyWithoutAppFileNestedInput = {
    create?: XOR<ReadingFeedbackCreateWithoutAppFileInput, ReadingFeedbackUncheckedCreateWithoutAppFileInput> | ReadingFeedbackCreateWithoutAppFileInput[] | ReadingFeedbackUncheckedCreateWithoutAppFileInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutAppFileInput | ReadingFeedbackCreateOrConnectWithoutAppFileInput[]
    upsert?: ReadingFeedbackUpsertWithWhereUniqueWithoutAppFileInput | ReadingFeedbackUpsertWithWhereUniqueWithoutAppFileInput[]
    createMany?: ReadingFeedbackCreateManyAppFileInputEnvelope
    set?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    disconnect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    delete?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    update?: ReadingFeedbackUpdateWithWhereUniqueWithoutAppFileInput | ReadingFeedbackUpdateWithWhereUniqueWithoutAppFileInput[]
    updateMany?: ReadingFeedbackUpdateManyWithWhereWithoutAppFileInput | ReadingFeedbackUpdateManyWithWhereWithoutAppFileInput[]
    deleteMany?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReadingInput = {
    create?: XOR<UserCreateWithoutReadingInput, UserUncheckedCreateWithoutReadingInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingInput
    connect?: UserWhereUniqueInput
  }

  export type ReadingAuthorCreateNestedManyWithoutReadingInput = {
    create?: XOR<ReadingAuthorCreateWithoutReadingInput, ReadingAuthorUncheckedCreateWithoutReadingInput> | ReadingAuthorCreateWithoutReadingInput[] | ReadingAuthorUncheckedCreateWithoutReadingInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutReadingInput | ReadingAuthorCreateOrConnectWithoutReadingInput[]
    createMany?: ReadingAuthorCreateManyReadingInputEnvelope
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
  }

  export type GroupCreateNestedOneWithoutReadingInput = {
    create?: XOR<GroupCreateWithoutReadingInput, GroupUncheckedCreateWithoutReadingInput>
    connectOrCreate?: GroupCreateOrConnectWithoutReadingInput
    connect?: GroupWhereUniqueInput
  }

  export type GroupAddressCreateNestedOneWithoutReadingInput = {
    create?: XOR<GroupAddressCreateWithoutReadingInput, GroupAddressUncheckedCreateWithoutReadingInput>
    connectOrCreate?: GroupAddressCreateOrConnectWithoutReadingInput
    connect?: GroupAddressWhereUniqueInput
  }

  export type ReadingAuthorUncheckedCreateNestedManyWithoutReadingInput = {
    create?: XOR<ReadingAuthorCreateWithoutReadingInput, ReadingAuthorUncheckedCreateWithoutReadingInput> | ReadingAuthorCreateWithoutReadingInput[] | ReadingAuthorUncheckedCreateWithoutReadingInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutReadingInput | ReadingAuthorCreateOrConnectWithoutReadingInput[]
    createMany?: ReadingAuthorCreateManyReadingInputEnvelope
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutReadingNestedInput = {
    create?: XOR<UserCreateWithoutReadingInput, UserUncheckedCreateWithoutReadingInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingInput
    upsert?: UserUpsertWithoutReadingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReadingInput, UserUpdateWithoutReadingInput>, UserUncheckedUpdateWithoutReadingInput>
  }

  export type ReadingAuthorUpdateManyWithoutReadingNestedInput = {
    create?: XOR<ReadingAuthorCreateWithoutReadingInput, ReadingAuthorUncheckedCreateWithoutReadingInput> | ReadingAuthorCreateWithoutReadingInput[] | ReadingAuthorUncheckedCreateWithoutReadingInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutReadingInput | ReadingAuthorCreateOrConnectWithoutReadingInput[]
    upsert?: ReadingAuthorUpsertWithWhereUniqueWithoutReadingInput | ReadingAuthorUpsertWithWhereUniqueWithoutReadingInput[]
    createMany?: ReadingAuthorCreateManyReadingInputEnvelope
    set?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    disconnect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    delete?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    update?: ReadingAuthorUpdateWithWhereUniqueWithoutReadingInput | ReadingAuthorUpdateWithWhereUniqueWithoutReadingInput[]
    updateMany?: ReadingAuthorUpdateManyWithWhereWithoutReadingInput | ReadingAuthorUpdateManyWithWhereWithoutReadingInput[]
    deleteMany?: ReadingAuthorScalarWhereInput | ReadingAuthorScalarWhereInput[]
  }

  export type GroupUpdateOneRequiredWithoutReadingNestedInput = {
    create?: XOR<GroupCreateWithoutReadingInput, GroupUncheckedCreateWithoutReadingInput>
    connectOrCreate?: GroupCreateOrConnectWithoutReadingInput
    upsert?: GroupUpsertWithoutReadingInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutReadingInput, GroupUpdateWithoutReadingInput>, GroupUncheckedUpdateWithoutReadingInput>
  }

  export type GroupAddressUpdateOneWithoutReadingNestedInput = {
    create?: XOR<GroupAddressCreateWithoutReadingInput, GroupAddressUncheckedCreateWithoutReadingInput>
    connectOrCreate?: GroupAddressCreateOrConnectWithoutReadingInput
    upsert?: GroupAddressUpsertWithoutReadingInput
    disconnect?: GroupAddressWhereInput | boolean
    delete?: GroupAddressWhereInput | boolean
    connect?: GroupAddressWhereUniqueInput
    update?: XOR<XOR<GroupAddressUpdateToOneWithWhereWithoutReadingInput, GroupAddressUpdateWithoutReadingInput>, GroupAddressUncheckedUpdateWithoutReadingInput>
  }

  export type ReadingAuthorUncheckedUpdateManyWithoutReadingNestedInput = {
    create?: XOR<ReadingAuthorCreateWithoutReadingInput, ReadingAuthorUncheckedCreateWithoutReadingInput> | ReadingAuthorCreateWithoutReadingInput[] | ReadingAuthorUncheckedCreateWithoutReadingInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutReadingInput | ReadingAuthorCreateOrConnectWithoutReadingInput[]
    upsert?: ReadingAuthorUpsertWithWhereUniqueWithoutReadingInput | ReadingAuthorUpsertWithWhereUniqueWithoutReadingInput[]
    createMany?: ReadingAuthorCreateManyReadingInputEnvelope
    set?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    disconnect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    delete?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    update?: ReadingAuthorUpdateWithWhereUniqueWithoutReadingInput | ReadingAuthorUpdateWithWhereUniqueWithoutReadingInput[]
    updateMany?: ReadingAuthorUpdateManyWithWhereWithoutReadingInput | ReadingAuthorUpdateManyWithWhereWithoutReadingInput[]
    deleteMany?: ReadingAuthorScalarWhereInput | ReadingAuthorScalarWhereInput[]
  }

  export type ReadingCreateNestedOneWithoutReadingAuthorInput = {
    create?: XOR<ReadingCreateWithoutReadingAuthorInput, ReadingUncheckedCreateWithoutReadingAuthorInput>
    connectOrCreate?: ReadingCreateOrConnectWithoutReadingAuthorInput
    connect?: ReadingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReadingAuthorInput = {
    create?: XOR<UserCreateWithoutReadingAuthorInput, UserUncheckedCreateWithoutReadingAuthorInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingAuthorInput
    connect?: UserWhereUniqueInput
  }

  export type ReadingManuscriptCreateNestedManyWithoutReadingAuthorInput = {
    create?: XOR<ReadingManuscriptCreateWithoutReadingAuthorInput, ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput> | ReadingManuscriptCreateWithoutReadingAuthorInput[] | ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput | ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput[]
    createMany?: ReadingManuscriptCreateManyReadingAuthorInputEnvelope
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
  }

  export type ReadingManuscriptUncheckedCreateNestedManyWithoutReadingAuthorInput = {
    create?: XOR<ReadingManuscriptCreateWithoutReadingAuthorInput, ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput> | ReadingManuscriptCreateWithoutReadingAuthorInput[] | ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput | ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput[]
    createMany?: ReadingManuscriptCreateManyReadingAuthorInputEnvelope
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
  }

  export type ReadingUpdateOneRequiredWithoutReadingAuthorNestedInput = {
    create?: XOR<ReadingCreateWithoutReadingAuthorInput, ReadingUncheckedCreateWithoutReadingAuthorInput>
    connectOrCreate?: ReadingCreateOrConnectWithoutReadingAuthorInput
    upsert?: ReadingUpsertWithoutReadingAuthorInput
    connect?: ReadingWhereUniqueInput
    update?: XOR<XOR<ReadingUpdateToOneWithWhereWithoutReadingAuthorInput, ReadingUpdateWithoutReadingAuthorInput>, ReadingUncheckedUpdateWithoutReadingAuthorInput>
  }

  export type UserUpdateOneRequiredWithoutReadingAuthorNestedInput = {
    create?: XOR<UserCreateWithoutReadingAuthorInput, UserUncheckedCreateWithoutReadingAuthorInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingAuthorInput
    upsert?: UserUpsertWithoutReadingAuthorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReadingAuthorInput, UserUpdateWithoutReadingAuthorInput>, UserUncheckedUpdateWithoutReadingAuthorInput>
  }

  export type ReadingManuscriptUpdateManyWithoutReadingAuthorNestedInput = {
    create?: XOR<ReadingManuscriptCreateWithoutReadingAuthorInput, ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput> | ReadingManuscriptCreateWithoutReadingAuthorInput[] | ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput | ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput[]
    upsert?: ReadingManuscriptUpsertWithWhereUniqueWithoutReadingAuthorInput | ReadingManuscriptUpsertWithWhereUniqueWithoutReadingAuthorInput[]
    createMany?: ReadingManuscriptCreateManyReadingAuthorInputEnvelope
    set?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    disconnect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    delete?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    update?: ReadingManuscriptUpdateWithWhereUniqueWithoutReadingAuthorInput | ReadingManuscriptUpdateWithWhereUniqueWithoutReadingAuthorInput[]
    updateMany?: ReadingManuscriptUpdateManyWithWhereWithoutReadingAuthorInput | ReadingManuscriptUpdateManyWithWhereWithoutReadingAuthorInput[]
    deleteMany?: ReadingManuscriptScalarWhereInput | ReadingManuscriptScalarWhereInput[]
  }

  export type ReadingManuscriptUncheckedUpdateManyWithoutReadingAuthorNestedInput = {
    create?: XOR<ReadingManuscriptCreateWithoutReadingAuthorInput, ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput> | ReadingManuscriptCreateWithoutReadingAuthorInput[] | ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput[]
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput | ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput[]
    upsert?: ReadingManuscriptUpsertWithWhereUniqueWithoutReadingAuthorInput | ReadingManuscriptUpsertWithWhereUniqueWithoutReadingAuthorInput[]
    createMany?: ReadingManuscriptCreateManyReadingAuthorInputEnvelope
    set?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    disconnect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    delete?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    connect?: ReadingManuscriptWhereUniqueInput | ReadingManuscriptWhereUniqueInput[]
    update?: ReadingManuscriptUpdateWithWhereUniqueWithoutReadingAuthorInput | ReadingManuscriptUpdateWithWhereUniqueWithoutReadingAuthorInput[]
    updateMany?: ReadingManuscriptUpdateManyWithWhereWithoutReadingAuthorInput | ReadingManuscriptUpdateManyWithWhereWithoutReadingAuthorInput[]
    deleteMany?: ReadingManuscriptScalarWhereInput | ReadingManuscriptScalarWhereInput[]
  }

  export type AppFileCreateNestedOneWithoutReadingFeedbackInput = {
    create?: XOR<AppFileCreateWithoutReadingFeedbackInput, AppFileUncheckedCreateWithoutReadingFeedbackInput>
    connectOrCreate?: AppFileCreateOrConnectWithoutReadingFeedbackInput
    connect?: AppFileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReadingFeedbackInput = {
    create?: XOR<UserCreateWithoutReadingFeedbackInput, UserUncheckedCreateWithoutReadingFeedbackInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingFeedbackInput
    connect?: UserWhereUniqueInput
  }

  export type ReadingManuscriptCreateNestedOneWithoutReadingFeedbackInput = {
    create?: XOR<ReadingManuscriptCreateWithoutReadingFeedbackInput, ReadingManuscriptUncheckedCreateWithoutReadingFeedbackInput>
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutReadingFeedbackInput
    connect?: ReadingManuscriptWhereUniqueInput
  }

  export type AppFileUpdateOneRequiredWithoutReadingFeedbackNestedInput = {
    create?: XOR<AppFileCreateWithoutReadingFeedbackInput, AppFileUncheckedCreateWithoutReadingFeedbackInput>
    connectOrCreate?: AppFileCreateOrConnectWithoutReadingFeedbackInput
    upsert?: AppFileUpsertWithoutReadingFeedbackInput
    connect?: AppFileWhereUniqueInput
    update?: XOR<XOR<AppFileUpdateToOneWithWhereWithoutReadingFeedbackInput, AppFileUpdateWithoutReadingFeedbackInput>, AppFileUncheckedUpdateWithoutReadingFeedbackInput>
  }

  export type UserUpdateOneRequiredWithoutReadingFeedbackNestedInput = {
    create?: XOR<UserCreateWithoutReadingFeedbackInput, UserUncheckedCreateWithoutReadingFeedbackInput>
    connectOrCreate?: UserCreateOrConnectWithoutReadingFeedbackInput
    upsert?: UserUpsertWithoutReadingFeedbackInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReadingFeedbackInput, UserUpdateWithoutReadingFeedbackInput>, UserUncheckedUpdateWithoutReadingFeedbackInput>
  }

  export type ReadingManuscriptUpdateOneRequiredWithoutReadingFeedbackNestedInput = {
    create?: XOR<ReadingManuscriptCreateWithoutReadingFeedbackInput, ReadingManuscriptUncheckedCreateWithoutReadingFeedbackInput>
    connectOrCreate?: ReadingManuscriptCreateOrConnectWithoutReadingFeedbackInput
    upsert?: ReadingManuscriptUpsertWithoutReadingFeedbackInput
    connect?: ReadingManuscriptWhereUniqueInput
    update?: XOR<XOR<ReadingManuscriptUpdateToOneWithWhereWithoutReadingFeedbackInput, ReadingManuscriptUpdateWithoutReadingFeedbackInput>, ReadingManuscriptUncheckedUpdateWithoutReadingFeedbackInput>
  }

  export type ReadingFeedbackCreateNestedManyWithoutReadingManuscriptInput = {
    create?: XOR<ReadingFeedbackCreateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput> | ReadingFeedbackCreateWithoutReadingManuscriptInput[] | ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput | ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput[]
    createMany?: ReadingFeedbackCreateManyReadingManuscriptInputEnvelope
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
  }

  export type ReadingAuthorCreateNestedOneWithoutReadingManuscriptInput = {
    create?: XOR<ReadingAuthorCreateWithoutReadingManuscriptInput, ReadingAuthorUncheckedCreateWithoutReadingManuscriptInput>
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutReadingManuscriptInput
    connect?: ReadingAuthorWhereUniqueInput
  }

  export type AppFileCreateNestedOneWithoutReadingManuscriptsInput = {
    create?: XOR<AppFileCreateWithoutReadingManuscriptsInput, AppFileUncheckedCreateWithoutReadingManuscriptsInput>
    connectOrCreate?: AppFileCreateOrConnectWithoutReadingManuscriptsInput
    connect?: AppFileWhereUniqueInput
  }

  export type ReadingFeedbackUncheckedCreateNestedManyWithoutReadingManuscriptInput = {
    create?: XOR<ReadingFeedbackCreateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput> | ReadingFeedbackCreateWithoutReadingManuscriptInput[] | ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput | ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput[]
    createMany?: ReadingFeedbackCreateManyReadingManuscriptInputEnvelope
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
  }

  export type ReadingFeedbackUpdateManyWithoutReadingManuscriptNestedInput = {
    create?: XOR<ReadingFeedbackCreateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput> | ReadingFeedbackCreateWithoutReadingManuscriptInput[] | ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput | ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput[]
    upsert?: ReadingFeedbackUpsertWithWhereUniqueWithoutReadingManuscriptInput | ReadingFeedbackUpsertWithWhereUniqueWithoutReadingManuscriptInput[]
    createMany?: ReadingFeedbackCreateManyReadingManuscriptInputEnvelope
    set?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    disconnect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    delete?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    update?: ReadingFeedbackUpdateWithWhereUniqueWithoutReadingManuscriptInput | ReadingFeedbackUpdateWithWhereUniqueWithoutReadingManuscriptInput[]
    updateMany?: ReadingFeedbackUpdateManyWithWhereWithoutReadingManuscriptInput | ReadingFeedbackUpdateManyWithWhereWithoutReadingManuscriptInput[]
    deleteMany?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
  }

  export type ReadingAuthorUpdateOneRequiredWithoutReadingManuscriptNestedInput = {
    create?: XOR<ReadingAuthorCreateWithoutReadingManuscriptInput, ReadingAuthorUncheckedCreateWithoutReadingManuscriptInput>
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutReadingManuscriptInput
    upsert?: ReadingAuthorUpsertWithoutReadingManuscriptInput
    connect?: ReadingAuthorWhereUniqueInput
    update?: XOR<XOR<ReadingAuthorUpdateToOneWithWhereWithoutReadingManuscriptInput, ReadingAuthorUpdateWithoutReadingManuscriptInput>, ReadingAuthorUncheckedUpdateWithoutReadingManuscriptInput>
  }

  export type AppFileUpdateOneRequiredWithoutReadingManuscriptsNestedInput = {
    create?: XOR<AppFileCreateWithoutReadingManuscriptsInput, AppFileUncheckedCreateWithoutReadingManuscriptsInput>
    connectOrCreate?: AppFileCreateOrConnectWithoutReadingManuscriptsInput
    upsert?: AppFileUpsertWithoutReadingManuscriptsInput
    connect?: AppFileWhereUniqueInput
    update?: XOR<XOR<AppFileUpdateToOneWithWhereWithoutReadingManuscriptsInput, AppFileUpdateWithoutReadingManuscriptsInput>, AppFileUncheckedUpdateWithoutReadingManuscriptsInput>
  }

  export type ReadingFeedbackUncheckedUpdateManyWithoutReadingManuscriptNestedInput = {
    create?: XOR<ReadingFeedbackCreateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput> | ReadingFeedbackCreateWithoutReadingManuscriptInput[] | ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput | ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput[]
    upsert?: ReadingFeedbackUpsertWithWhereUniqueWithoutReadingManuscriptInput | ReadingFeedbackUpsertWithWhereUniqueWithoutReadingManuscriptInput[]
    createMany?: ReadingFeedbackCreateManyReadingManuscriptInputEnvelope
    set?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    disconnect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    delete?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    update?: ReadingFeedbackUpdateWithWhereUniqueWithoutReadingManuscriptInput | ReadingFeedbackUpdateWithWhereUniqueWithoutReadingManuscriptInput[]
    updateMany?: ReadingFeedbackUpdateManyWithWhereWithoutReadingManuscriptInput | ReadingFeedbackUpdateManyWithWhereWithoutReadingManuscriptInput[]
    deleteMany?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
  }

  export type GroupAddressCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupAddressCreateWithoutGroupInput, GroupAddressUncheckedCreateWithoutGroupInput> | GroupAddressCreateWithoutGroupInput[] | GroupAddressUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupAddressCreateOrConnectWithoutGroupInput | GroupAddressCreateOrConnectWithoutGroupInput[]
    createMany?: GroupAddressCreateManyGroupInputEnvelope
    connect?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
  }

  export type GroupUserCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type GroupNewsCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupNewsCreateWithoutGroupInput, GroupNewsUncheckedCreateWithoutGroupInput> | GroupNewsCreateWithoutGroupInput[] | GroupNewsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupNewsCreateOrConnectWithoutGroupInput | GroupNewsCreateOrConnectWithoutGroupInput[]
    createMany?: GroupNewsCreateManyGroupInputEnvelope
    connect?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
  }

  export type ReadingCreateNestedManyWithoutGroupInput = {
    create?: XOR<ReadingCreateWithoutGroupInput, ReadingUncheckedCreateWithoutGroupInput> | ReadingCreateWithoutGroupInput[] | ReadingUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupInput | ReadingCreateOrConnectWithoutGroupInput[]
    createMany?: ReadingCreateManyGroupInputEnvelope
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
  }

  export type GroupUrlCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupUrlCreateWithoutGroupInput, GroupUrlUncheckedCreateWithoutGroupInput> | GroupUrlCreateWithoutGroupInput[] | GroupUrlUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUrlCreateOrConnectWithoutGroupInput | GroupUrlCreateOrConnectWithoutGroupInput[]
    createMany?: GroupUrlCreateManyGroupInputEnvelope
    connect?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutGroupInput = {
    create?: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupInput
    connect?: UserWhereUniqueInput
  }

  export type GroupAddressUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupAddressCreateWithoutGroupInput, GroupAddressUncheckedCreateWithoutGroupInput> | GroupAddressCreateWithoutGroupInput[] | GroupAddressUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupAddressCreateOrConnectWithoutGroupInput | GroupAddressCreateOrConnectWithoutGroupInput[]
    createMany?: GroupAddressCreateManyGroupInputEnvelope
    connect?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
  }

  export type GroupUserUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type GroupNewsUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupNewsCreateWithoutGroupInput, GroupNewsUncheckedCreateWithoutGroupInput> | GroupNewsCreateWithoutGroupInput[] | GroupNewsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupNewsCreateOrConnectWithoutGroupInput | GroupNewsCreateOrConnectWithoutGroupInput[]
    createMany?: GroupNewsCreateManyGroupInputEnvelope
    connect?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
  }

  export type ReadingUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<ReadingCreateWithoutGroupInput, ReadingUncheckedCreateWithoutGroupInput> | ReadingCreateWithoutGroupInput[] | ReadingUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupInput | ReadingCreateOrConnectWithoutGroupInput[]
    createMany?: ReadingCreateManyGroupInputEnvelope
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
  }

  export type GroupUrlUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupUrlCreateWithoutGroupInput, GroupUrlUncheckedCreateWithoutGroupInput> | GroupUrlCreateWithoutGroupInput[] | GroupUrlUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUrlCreateOrConnectWithoutGroupInput | GroupUrlCreateOrConnectWithoutGroupInput[]
    createMany?: GroupUrlCreateManyGroupInputEnvelope
    connect?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
  }

  export type EnumGroupTypeFieldUpdateOperationsInput = {
    set?: $Enums.GroupType
  }

  export type GroupAddressUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupAddressCreateWithoutGroupInput, GroupAddressUncheckedCreateWithoutGroupInput> | GroupAddressCreateWithoutGroupInput[] | GroupAddressUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupAddressCreateOrConnectWithoutGroupInput | GroupAddressCreateOrConnectWithoutGroupInput[]
    upsert?: GroupAddressUpsertWithWhereUniqueWithoutGroupInput | GroupAddressUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupAddressCreateManyGroupInputEnvelope
    set?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    disconnect?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    delete?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    connect?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    update?: GroupAddressUpdateWithWhereUniqueWithoutGroupInput | GroupAddressUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupAddressUpdateManyWithWhereWithoutGroupInput | GroupAddressUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupAddressScalarWhereInput | GroupAddressScalarWhereInput[]
  }

  export type GroupUserUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutGroupInput | GroupUserUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutGroupInput | GroupUserUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutGroupInput | GroupUserUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type GroupNewsUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupNewsCreateWithoutGroupInput, GroupNewsUncheckedCreateWithoutGroupInput> | GroupNewsCreateWithoutGroupInput[] | GroupNewsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupNewsCreateOrConnectWithoutGroupInput | GroupNewsCreateOrConnectWithoutGroupInput[]
    upsert?: GroupNewsUpsertWithWhereUniqueWithoutGroupInput | GroupNewsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupNewsCreateManyGroupInputEnvelope
    set?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    disconnect?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    delete?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    connect?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    update?: GroupNewsUpdateWithWhereUniqueWithoutGroupInput | GroupNewsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupNewsUpdateManyWithWhereWithoutGroupInput | GroupNewsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupNewsScalarWhereInput | GroupNewsScalarWhereInput[]
  }

  export type ReadingUpdateManyWithoutGroupNestedInput = {
    create?: XOR<ReadingCreateWithoutGroupInput, ReadingUncheckedCreateWithoutGroupInput> | ReadingCreateWithoutGroupInput[] | ReadingUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupInput | ReadingCreateOrConnectWithoutGroupInput[]
    upsert?: ReadingUpsertWithWhereUniqueWithoutGroupInput | ReadingUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: ReadingCreateManyGroupInputEnvelope
    set?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    disconnect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    delete?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    update?: ReadingUpdateWithWhereUniqueWithoutGroupInput | ReadingUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: ReadingUpdateManyWithWhereWithoutGroupInput | ReadingUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: ReadingScalarWhereInput | ReadingScalarWhereInput[]
  }

  export type GroupUrlUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupUrlCreateWithoutGroupInput, GroupUrlUncheckedCreateWithoutGroupInput> | GroupUrlCreateWithoutGroupInput[] | GroupUrlUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUrlCreateOrConnectWithoutGroupInput | GroupUrlCreateOrConnectWithoutGroupInput[]
    upsert?: GroupUrlUpsertWithWhereUniqueWithoutGroupInput | GroupUrlUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupUrlCreateManyGroupInputEnvelope
    set?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    disconnect?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    delete?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    connect?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    update?: GroupUrlUpdateWithWhereUniqueWithoutGroupInput | GroupUrlUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupUrlUpdateManyWithWhereWithoutGroupInput | GroupUrlUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupUrlScalarWhereInput | GroupUrlScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutGroupNestedInput = {
    create?: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupInput
    upsert?: UserUpsertWithoutGroupInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupInput, UserUpdateWithoutGroupInput>, UserUncheckedUpdateWithoutGroupInput>
  }

  export type GroupAddressUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupAddressCreateWithoutGroupInput, GroupAddressUncheckedCreateWithoutGroupInput> | GroupAddressCreateWithoutGroupInput[] | GroupAddressUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupAddressCreateOrConnectWithoutGroupInput | GroupAddressCreateOrConnectWithoutGroupInput[]
    upsert?: GroupAddressUpsertWithWhereUniqueWithoutGroupInput | GroupAddressUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupAddressCreateManyGroupInputEnvelope
    set?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    disconnect?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    delete?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    connect?: GroupAddressWhereUniqueInput | GroupAddressWhereUniqueInput[]
    update?: GroupAddressUpdateWithWhereUniqueWithoutGroupInput | GroupAddressUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupAddressUpdateManyWithWhereWithoutGroupInput | GroupAddressUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupAddressScalarWhereInput | GroupAddressScalarWhereInput[]
  }

  export type GroupUserUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutGroupInput | GroupUserUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutGroupInput | GroupUserUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutGroupInput | GroupUserUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type GroupNewsUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupNewsCreateWithoutGroupInput, GroupNewsUncheckedCreateWithoutGroupInput> | GroupNewsCreateWithoutGroupInput[] | GroupNewsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupNewsCreateOrConnectWithoutGroupInput | GroupNewsCreateOrConnectWithoutGroupInput[]
    upsert?: GroupNewsUpsertWithWhereUniqueWithoutGroupInput | GroupNewsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupNewsCreateManyGroupInputEnvelope
    set?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    disconnect?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    delete?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    connect?: GroupNewsWhereUniqueInput | GroupNewsWhereUniqueInput[]
    update?: GroupNewsUpdateWithWhereUniqueWithoutGroupInput | GroupNewsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupNewsUpdateManyWithWhereWithoutGroupInput | GroupNewsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupNewsScalarWhereInput | GroupNewsScalarWhereInput[]
  }

  export type ReadingUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<ReadingCreateWithoutGroupInput, ReadingUncheckedCreateWithoutGroupInput> | ReadingCreateWithoutGroupInput[] | ReadingUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupInput | ReadingCreateOrConnectWithoutGroupInput[]
    upsert?: ReadingUpsertWithWhereUniqueWithoutGroupInput | ReadingUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: ReadingCreateManyGroupInputEnvelope
    set?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    disconnect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    delete?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    update?: ReadingUpdateWithWhereUniqueWithoutGroupInput | ReadingUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: ReadingUpdateManyWithWhereWithoutGroupInput | ReadingUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: ReadingScalarWhereInput | ReadingScalarWhereInput[]
  }

  export type GroupUrlUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupUrlCreateWithoutGroupInput, GroupUrlUncheckedCreateWithoutGroupInput> | GroupUrlCreateWithoutGroupInput[] | GroupUrlUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUrlCreateOrConnectWithoutGroupInput | GroupUrlCreateOrConnectWithoutGroupInput[]
    upsert?: GroupUrlUpsertWithWhereUniqueWithoutGroupInput | GroupUrlUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupUrlCreateManyGroupInputEnvelope
    set?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    disconnect?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    delete?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    connect?: GroupUrlWhereUniqueInput | GroupUrlWhereUniqueInput[]
    update?: GroupUrlUpdateWithWhereUniqueWithoutGroupInput | GroupUrlUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupUrlUpdateManyWithWhereWithoutGroupInput | GroupUrlUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupUrlScalarWhereInput | GroupUrlScalarWhereInput[]
  }

  export type GroupCreateNestedOneWithoutGroupAddressInput = {
    create?: XOR<GroupCreateWithoutGroupAddressInput, GroupUncheckedCreateWithoutGroupAddressInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupAddressInput
    connect?: GroupWhereUniqueInput
  }

  export type ReadingCreateNestedOneWithoutGroupAddressInput = {
    create?: XOR<ReadingCreateWithoutGroupAddressInput, ReadingUncheckedCreateWithoutGroupAddressInput>
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupAddressInput
    connect?: ReadingWhereUniqueInput
  }

  export type ReadingUncheckedCreateNestedOneWithoutGroupAddressInput = {
    create?: XOR<ReadingCreateWithoutGroupAddressInput, ReadingUncheckedCreateWithoutGroupAddressInput>
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupAddressInput
    connect?: ReadingWhereUniqueInput
  }

  export type GroupUpdateOneWithoutGroupAddressNestedInput = {
    create?: XOR<GroupCreateWithoutGroupAddressInput, GroupUncheckedCreateWithoutGroupAddressInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupAddressInput
    upsert?: GroupUpsertWithoutGroupAddressInput
    disconnect?: GroupWhereInput | boolean
    delete?: GroupWhereInput | boolean
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutGroupAddressInput, GroupUpdateWithoutGroupAddressInput>, GroupUncheckedUpdateWithoutGroupAddressInput>
  }

  export type ReadingUpdateOneWithoutGroupAddressNestedInput = {
    create?: XOR<ReadingCreateWithoutGroupAddressInput, ReadingUncheckedCreateWithoutGroupAddressInput>
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupAddressInput
    upsert?: ReadingUpsertWithoutGroupAddressInput
    disconnect?: ReadingWhereInput | boolean
    delete?: ReadingWhereInput | boolean
    connect?: ReadingWhereUniqueInput
    update?: XOR<XOR<ReadingUpdateToOneWithWhereWithoutGroupAddressInput, ReadingUpdateWithoutGroupAddressInput>, ReadingUncheckedUpdateWithoutGroupAddressInput>
  }

  export type ReadingUncheckedUpdateOneWithoutGroupAddressNestedInput = {
    create?: XOR<ReadingCreateWithoutGroupAddressInput, ReadingUncheckedCreateWithoutGroupAddressInput>
    connectOrCreate?: ReadingCreateOrConnectWithoutGroupAddressInput
    upsert?: ReadingUpsertWithoutGroupAddressInput
    disconnect?: ReadingWhereInput | boolean
    delete?: ReadingWhereInput | boolean
    connect?: ReadingWhereUniqueInput
    update?: XOR<XOR<ReadingUpdateToOneWithWhereWithoutGroupAddressInput, ReadingUpdateWithoutGroupAddressInput>, ReadingUncheckedUpdateWithoutGroupAddressInput>
  }

  export type GroupCreateNestedOneWithoutGroupNewsInput = {
    create?: XOR<GroupCreateWithoutGroupNewsInput, GroupUncheckedCreateWithoutGroupNewsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupNewsInput
    connect?: GroupWhereUniqueInput
  }

  export type GroupUpdateOneRequiredWithoutGroupNewsNestedInput = {
    create?: XOR<GroupCreateWithoutGroupNewsInput, GroupUncheckedCreateWithoutGroupNewsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupNewsInput
    upsert?: GroupUpsertWithoutGroupNewsInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutGroupNewsInput, GroupUpdateWithoutGroupNewsInput>, GroupUncheckedUpdateWithoutGroupNewsInput>
  }

  export type UserCreateNestedOneWithoutGroupUserInput = {
    create?: XOR<UserCreateWithoutGroupUserInput, UserUncheckedCreateWithoutGroupUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupUserInput
    connect?: UserWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutGroupUserInput = {
    create?: XOR<GroupCreateWithoutGroupUserInput, GroupUncheckedCreateWithoutGroupUserInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupUserInput
    connect?: GroupWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGroupUserNestedInput = {
    create?: XOR<UserCreateWithoutGroupUserInput, UserUncheckedCreateWithoutGroupUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupUserInput
    upsert?: UserUpsertWithoutGroupUserInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupUserInput, UserUpdateWithoutGroupUserInput>, UserUncheckedUpdateWithoutGroupUserInput>
  }

  export type GroupUpdateOneRequiredWithoutGroupUserNestedInput = {
    create?: XOR<GroupCreateWithoutGroupUserInput, GroupUncheckedCreateWithoutGroupUserInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupUserInput
    upsert?: GroupUpsertWithoutGroupUserInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutGroupUserInput, GroupUpdateWithoutGroupUserInput>, GroupUncheckedUpdateWithoutGroupUserInput>
  }

  export type GroupCreateNestedOneWithoutGroupUrlInput = {
    create?: XOR<GroupCreateWithoutGroupUrlInput, GroupUncheckedCreateWithoutGroupUrlInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupUrlInput
    connect?: GroupWhereUniqueInput
  }

  export type EnumUrlTypeFieldUpdateOperationsInput = {
    set?: $Enums.UrlType
  }

  export type GroupUpdateOneWithoutGroupUrlNestedInput = {
    create?: XOR<GroupCreateWithoutGroupUrlInput, GroupUncheckedCreateWithoutGroupUrlInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupUrlInput
    upsert?: GroupUpsertWithoutGroupUrlInput
    disconnect?: GroupWhereInput | boolean
    delete?: GroupWhereInput | boolean
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutGroupUrlInput, GroupUpdateWithoutGroupUrlInput>, GroupUncheckedUpdateWithoutGroupUrlInput>
  }

  export type GroupUserCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type GroupCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupCreateWithoutUserInput, GroupUncheckedCreateWithoutUserInput> | GroupCreateWithoutUserInput[] | GroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutUserInput | GroupCreateOrConnectWithoutUserInput[]
    createMany?: GroupCreateManyUserInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type ReadingCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingCreateWithoutUserInput, ReadingUncheckedCreateWithoutUserInput> | ReadingCreateWithoutUserInput[] | ReadingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutUserInput | ReadingCreateOrConnectWithoutUserInput[]
    createMany?: ReadingCreateManyUserInputEnvelope
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
  }

  export type UserProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type AppFileCreateNestedManyWithoutUserInput = {
    create?: XOR<AppFileCreateWithoutUserInput, AppFileUncheckedCreateWithoutUserInput> | AppFileCreateWithoutUserInput[] | AppFileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppFileCreateOrConnectWithoutUserInput | AppFileCreateOrConnectWithoutUserInput[]
    createMany?: AppFileCreateManyUserInputEnvelope
    connect?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
  }

  export type UserUrlCreateNestedManyWithoutUserInput = {
    create?: XOR<UserUrlCreateWithoutUserInput, UserUrlUncheckedCreateWithoutUserInput> | UserUrlCreateWithoutUserInput[] | UserUrlUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserUrlCreateOrConnectWithoutUserInput | UserUrlCreateOrConnectWithoutUserInput[]
    createMany?: UserUrlCreateManyUserInputEnvelope
    connect?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
  }

  export type ReadingAuthorCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingAuthorCreateWithoutUserInput, ReadingAuthorUncheckedCreateWithoutUserInput> | ReadingAuthorCreateWithoutUserInput[] | ReadingAuthorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutUserInput | ReadingAuthorCreateOrConnectWithoutUserInput[]
    createMany?: ReadingAuthorCreateManyUserInputEnvelope
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
  }

  export type ReadingFeedbackCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingFeedbackCreateWithoutUserInput, ReadingFeedbackUncheckedCreateWithoutUserInput> | ReadingFeedbackCreateWithoutUserInput[] | ReadingFeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutUserInput | ReadingFeedbackCreateOrConnectWithoutUserInput[]
    createMany?: ReadingFeedbackCreateManyUserInputEnvelope
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
  }

  export type GroupUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type GroupUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupCreateWithoutUserInput, GroupUncheckedCreateWithoutUserInput> | GroupCreateWithoutUserInput[] | GroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutUserInput | GroupCreateOrConnectWithoutUserInput[]
    createMany?: GroupCreateManyUserInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type ReadingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingCreateWithoutUserInput, ReadingUncheckedCreateWithoutUserInput> | ReadingCreateWithoutUserInput[] | ReadingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutUserInput | ReadingCreateOrConnectWithoutUserInput[]
    createMany?: ReadingCreateManyUserInputEnvelope
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
  }

  export type UserProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type AppFileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AppFileCreateWithoutUserInput, AppFileUncheckedCreateWithoutUserInput> | AppFileCreateWithoutUserInput[] | AppFileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppFileCreateOrConnectWithoutUserInput | AppFileCreateOrConnectWithoutUserInput[]
    createMany?: AppFileCreateManyUserInputEnvelope
    connect?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
  }

  export type UserUrlUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserUrlCreateWithoutUserInput, UserUrlUncheckedCreateWithoutUserInput> | UserUrlCreateWithoutUserInput[] | UserUrlUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserUrlCreateOrConnectWithoutUserInput | UserUrlCreateOrConnectWithoutUserInput[]
    createMany?: UserUrlCreateManyUserInputEnvelope
    connect?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
  }

  export type ReadingAuthorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingAuthorCreateWithoutUserInput, ReadingAuthorUncheckedCreateWithoutUserInput> | ReadingAuthorCreateWithoutUserInput[] | ReadingAuthorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutUserInput | ReadingAuthorCreateOrConnectWithoutUserInput[]
    createMany?: ReadingAuthorCreateManyUserInputEnvelope
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
  }

  export type ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReadingFeedbackCreateWithoutUserInput, ReadingFeedbackUncheckedCreateWithoutUserInput> | ReadingFeedbackCreateWithoutUserInput[] | ReadingFeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutUserInput | ReadingFeedbackCreateOrConnectWithoutUserInput[]
    createMany?: ReadingFeedbackCreateManyUserInputEnvelope
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type GroupUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutUserInput | GroupUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutUserInput | GroupUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutUserInput | GroupUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type GroupUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupCreateWithoutUserInput, GroupUncheckedCreateWithoutUserInput> | GroupCreateWithoutUserInput[] | GroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutUserInput | GroupCreateOrConnectWithoutUserInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutUserInput | GroupUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupCreateManyUserInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutUserInput | GroupUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutUserInput | GroupUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type ReadingUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingCreateWithoutUserInput, ReadingUncheckedCreateWithoutUserInput> | ReadingCreateWithoutUserInput[] | ReadingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutUserInput | ReadingCreateOrConnectWithoutUserInput[]
    upsert?: ReadingUpsertWithWhereUniqueWithoutUserInput | ReadingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingCreateManyUserInputEnvelope
    set?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    disconnect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    delete?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    update?: ReadingUpdateWithWhereUniqueWithoutUserInput | ReadingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingUpdateManyWithWhereWithoutUserInput | ReadingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingScalarWhereInput | ReadingScalarWhereInput[]
  }

  export type UserProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type AppFileUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppFileCreateWithoutUserInput, AppFileUncheckedCreateWithoutUserInput> | AppFileCreateWithoutUserInput[] | AppFileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppFileCreateOrConnectWithoutUserInput | AppFileCreateOrConnectWithoutUserInput[]
    upsert?: AppFileUpsertWithWhereUniqueWithoutUserInput | AppFileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppFileCreateManyUserInputEnvelope
    set?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    disconnect?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    delete?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    connect?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    update?: AppFileUpdateWithWhereUniqueWithoutUserInput | AppFileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppFileUpdateManyWithWhereWithoutUserInput | AppFileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppFileScalarWhereInput | AppFileScalarWhereInput[]
  }

  export type UserUrlUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserUrlCreateWithoutUserInput, UserUrlUncheckedCreateWithoutUserInput> | UserUrlCreateWithoutUserInput[] | UserUrlUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserUrlCreateOrConnectWithoutUserInput | UserUrlCreateOrConnectWithoutUserInput[]
    upsert?: UserUrlUpsertWithWhereUniqueWithoutUserInput | UserUrlUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserUrlCreateManyUserInputEnvelope
    set?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    disconnect?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    delete?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    connect?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    update?: UserUrlUpdateWithWhereUniqueWithoutUserInput | UserUrlUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserUrlUpdateManyWithWhereWithoutUserInput | UserUrlUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserUrlScalarWhereInput | UserUrlScalarWhereInput[]
  }

  export type ReadingAuthorUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingAuthorCreateWithoutUserInput, ReadingAuthorUncheckedCreateWithoutUserInput> | ReadingAuthorCreateWithoutUserInput[] | ReadingAuthorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutUserInput | ReadingAuthorCreateOrConnectWithoutUserInput[]
    upsert?: ReadingAuthorUpsertWithWhereUniqueWithoutUserInput | ReadingAuthorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingAuthorCreateManyUserInputEnvelope
    set?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    disconnect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    delete?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    update?: ReadingAuthorUpdateWithWhereUniqueWithoutUserInput | ReadingAuthorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingAuthorUpdateManyWithWhereWithoutUserInput | ReadingAuthorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingAuthorScalarWhereInput | ReadingAuthorScalarWhereInput[]
  }

  export type ReadingFeedbackUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingFeedbackCreateWithoutUserInput, ReadingFeedbackUncheckedCreateWithoutUserInput> | ReadingFeedbackCreateWithoutUserInput[] | ReadingFeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutUserInput | ReadingFeedbackCreateOrConnectWithoutUserInput[]
    upsert?: ReadingFeedbackUpsertWithWhereUniqueWithoutUserInput | ReadingFeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingFeedbackCreateManyUserInputEnvelope
    set?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    disconnect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    delete?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    update?: ReadingFeedbackUpdateWithWhereUniqueWithoutUserInput | ReadingFeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingFeedbackUpdateManyWithWhereWithoutUserInput | ReadingFeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
  }

  export type GroupUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutUserInput | GroupUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutUserInput | GroupUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutUserInput | GroupUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type GroupUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupCreateWithoutUserInput, GroupUncheckedCreateWithoutUserInput> | GroupCreateWithoutUserInput[] | GroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutUserInput | GroupCreateOrConnectWithoutUserInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutUserInput | GroupUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupCreateManyUserInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutUserInput | GroupUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutUserInput | GroupUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type ReadingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingCreateWithoutUserInput, ReadingUncheckedCreateWithoutUserInput> | ReadingCreateWithoutUserInput[] | ReadingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingCreateOrConnectWithoutUserInput | ReadingCreateOrConnectWithoutUserInput[]
    upsert?: ReadingUpsertWithWhereUniqueWithoutUserInput | ReadingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingCreateManyUserInputEnvelope
    set?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    disconnect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    delete?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    connect?: ReadingWhereUniqueInput | ReadingWhereUniqueInput[]
    update?: ReadingUpdateWithWhereUniqueWithoutUserInput | ReadingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingUpdateManyWithWhereWithoutUserInput | ReadingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingScalarWhereInput | ReadingScalarWhereInput[]
  }

  export type UserProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type AppFileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppFileCreateWithoutUserInput, AppFileUncheckedCreateWithoutUserInput> | AppFileCreateWithoutUserInput[] | AppFileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppFileCreateOrConnectWithoutUserInput | AppFileCreateOrConnectWithoutUserInput[]
    upsert?: AppFileUpsertWithWhereUniqueWithoutUserInput | AppFileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppFileCreateManyUserInputEnvelope
    set?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    disconnect?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    delete?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    connect?: AppFileWhereUniqueInput | AppFileWhereUniqueInput[]
    update?: AppFileUpdateWithWhereUniqueWithoutUserInput | AppFileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppFileUpdateManyWithWhereWithoutUserInput | AppFileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppFileScalarWhereInput | AppFileScalarWhereInput[]
  }

  export type UserUrlUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserUrlCreateWithoutUserInput, UserUrlUncheckedCreateWithoutUserInput> | UserUrlCreateWithoutUserInput[] | UserUrlUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserUrlCreateOrConnectWithoutUserInput | UserUrlCreateOrConnectWithoutUserInput[]
    upsert?: UserUrlUpsertWithWhereUniqueWithoutUserInput | UserUrlUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserUrlCreateManyUserInputEnvelope
    set?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    disconnect?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    delete?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    connect?: UserUrlWhereUniqueInput | UserUrlWhereUniqueInput[]
    update?: UserUrlUpdateWithWhereUniqueWithoutUserInput | UserUrlUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserUrlUpdateManyWithWhereWithoutUserInput | UserUrlUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserUrlScalarWhereInput | UserUrlScalarWhereInput[]
  }

  export type ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingAuthorCreateWithoutUserInput, ReadingAuthorUncheckedCreateWithoutUserInput> | ReadingAuthorCreateWithoutUserInput[] | ReadingAuthorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingAuthorCreateOrConnectWithoutUserInput | ReadingAuthorCreateOrConnectWithoutUserInput[]
    upsert?: ReadingAuthorUpsertWithWhereUniqueWithoutUserInput | ReadingAuthorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingAuthorCreateManyUserInputEnvelope
    set?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    disconnect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    delete?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    connect?: ReadingAuthorWhereUniqueInput | ReadingAuthorWhereUniqueInput[]
    update?: ReadingAuthorUpdateWithWhereUniqueWithoutUserInput | ReadingAuthorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingAuthorUpdateManyWithWhereWithoutUserInput | ReadingAuthorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingAuthorScalarWhereInput | ReadingAuthorScalarWhereInput[]
  }

  export type ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReadingFeedbackCreateWithoutUserInput, ReadingFeedbackUncheckedCreateWithoutUserInput> | ReadingFeedbackCreateWithoutUserInput[] | ReadingFeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReadingFeedbackCreateOrConnectWithoutUserInput | ReadingFeedbackCreateOrConnectWithoutUserInput[]
    upsert?: ReadingFeedbackUpsertWithWhereUniqueWithoutUserInput | ReadingFeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReadingFeedbackCreateManyUserInputEnvelope
    set?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    disconnect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    delete?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    connect?: ReadingFeedbackWhereUniqueInput | ReadingFeedbackWhereUniqueInput[]
    update?: ReadingFeedbackUpdateWithWhereUniqueWithoutUserInput | ReadingFeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReadingFeedbackUpdateManyWithWhereWithoutUserInput | ReadingFeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserProfileInput = {
    create?: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserProfileNestedInput = {
    create?: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserProfileInput
    upsert?: UserUpsertWithoutUserProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserProfileInput, UserUpdateWithoutUserProfileInput>, UserUncheckedUpdateWithoutUserProfileInput>
  }

  export type UserCreateNestedOneWithoutUrlsInput = {
    create?: XOR<UserCreateWithoutUrlsInput, UserUncheckedCreateWithoutUrlsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUrlsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutUrlsNestedInput = {
    create?: XOR<UserCreateWithoutUrlsInput, UserUncheckedCreateWithoutUrlsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUrlsInput
    upsert?: UserUpsertWithoutUrlsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUrlsInput, UserUpdateWithoutUrlsInput>, UserUncheckedUpdateWithoutUrlsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumFileTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFileTypeFilter<$PrismaModel> | $Enums.FileType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumWorkTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkType | EnumWorkTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkTypeNullableFilter<$PrismaModel> | $Enums.WorkType | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenreNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableFilter<$PrismaModel> | $Enums.Genre | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type NestedEnumFileTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileType[] | ListEnumFileTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFileTypeWithAggregatesFilter<$PrismaModel> | $Enums.FileType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileTypeFilter<$PrismaModel>
    _max?: NestedEnumFileTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumWorkTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkType | EnumWorkTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.WorkType[] | ListEnumWorkTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.WorkType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumWorkTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumWorkTypeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenreNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableWithAggregatesFilter<$PrismaModel> | $Enums.Genre | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenreNullableFilter<$PrismaModel>
    _max?: NestedEnumGenreNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGroupTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupType | EnumGroupTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupTypeFilter<$PrismaModel> | $Enums.GroupType
  }

  export type NestedEnumGroupTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupType | EnumGroupTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupType[] | ListEnumGroupTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupTypeWithAggregatesFilter<$PrismaModel> | $Enums.GroupType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupTypeFilter<$PrismaModel>
    _max?: NestedEnumGroupTypeFilter<$PrismaModel>
  }

  export type NestedEnumUrlTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UrlType | EnumUrlTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUrlTypeFilter<$PrismaModel> | $Enums.UrlType
  }

  export type NestedEnumUrlTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UrlType | EnumUrlTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UrlType[] | ListEnumUrlTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUrlTypeWithAggregatesFilter<$PrismaModel> | $Enums.UrlType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUrlTypeFilter<$PrismaModel>
    _max?: NestedEnumUrlTypeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserCreateWithoutAppFilesInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    group?: GroupCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAppFilesInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAppFilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppFilesInput, UserUncheckedCreateWithoutAppFilesInput>
  }

  export type ReadingManuscriptCreateWithoutAppFileInput = {
    id?: string
    readingAuthorId: string
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutReadingManuscriptInput
    readingAuthor: ReadingAuthorCreateNestedOneWithoutReadingManuscriptInput
  }

  export type ReadingManuscriptUncheckedCreateWithoutAppFileInput = {
    id?: string
    readingId: string
    readingAuthorId: string
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutReadingManuscriptInput
  }

  export type ReadingManuscriptCreateOrConnectWithoutAppFileInput = {
    where: ReadingManuscriptWhereUniqueInput
    create: XOR<ReadingManuscriptCreateWithoutAppFileInput, ReadingManuscriptUncheckedCreateWithoutAppFileInput>
  }

  export type ReadingManuscriptCreateManyAppFileInputEnvelope = {
    data: ReadingManuscriptCreateManyAppFileInput | ReadingManuscriptCreateManyAppFileInput[]
    skipDuplicates?: boolean
  }

  export type ReadingFeedbackCreateWithoutAppFileInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReadingFeedbackInput
    readingManuscript: ReadingManuscriptCreateNestedOneWithoutReadingFeedbackInput
  }

  export type ReadingFeedbackUncheckedCreateWithoutAppFileInput = {
    id?: string
    readingManuscriptId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingFeedbackCreateOrConnectWithoutAppFileInput = {
    where: ReadingFeedbackWhereUniqueInput
    create: XOR<ReadingFeedbackCreateWithoutAppFileInput, ReadingFeedbackUncheckedCreateWithoutAppFileInput>
  }

  export type ReadingFeedbackCreateManyAppFileInputEnvelope = {
    data: ReadingFeedbackCreateManyAppFileInput | ReadingFeedbackCreateManyAppFileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAppFilesInput = {
    update: XOR<UserUpdateWithoutAppFilesInput, UserUncheckedUpdateWithoutAppFilesInput>
    create: XOR<UserCreateWithoutAppFilesInput, UserUncheckedCreateWithoutAppFilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppFilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppFilesInput, UserUncheckedUpdateWithoutAppFilesInput>
  }

  export type UserUpdateWithoutAppFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    group?: GroupUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAppFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReadingManuscriptUpsertWithWhereUniqueWithoutAppFileInput = {
    where: ReadingManuscriptWhereUniqueInput
    update: XOR<ReadingManuscriptUpdateWithoutAppFileInput, ReadingManuscriptUncheckedUpdateWithoutAppFileInput>
    create: XOR<ReadingManuscriptCreateWithoutAppFileInput, ReadingManuscriptUncheckedCreateWithoutAppFileInput>
  }

  export type ReadingManuscriptUpdateWithWhereUniqueWithoutAppFileInput = {
    where: ReadingManuscriptWhereUniqueInput
    data: XOR<ReadingManuscriptUpdateWithoutAppFileInput, ReadingManuscriptUncheckedUpdateWithoutAppFileInput>
  }

  export type ReadingManuscriptUpdateManyWithWhereWithoutAppFileInput = {
    where: ReadingManuscriptScalarWhereInput
    data: XOR<ReadingManuscriptUpdateManyMutationInput, ReadingManuscriptUncheckedUpdateManyWithoutAppFileInput>
  }

  export type ReadingManuscriptScalarWhereInput = {
    AND?: ReadingManuscriptScalarWhereInput | ReadingManuscriptScalarWhereInput[]
    OR?: ReadingManuscriptScalarWhereInput[]
    NOT?: ReadingManuscriptScalarWhereInput | ReadingManuscriptScalarWhereInput[]
    id?: StringFilter<"ReadingManuscript"> | string
    readingId?: StringFilter<"ReadingManuscript"> | string
    readingAuthorId?: StringFilter<"ReadingManuscript"> | string
    appFileId?: StringFilter<"ReadingManuscript"> | string
  }

  export type ReadingFeedbackUpsertWithWhereUniqueWithoutAppFileInput = {
    where: ReadingFeedbackWhereUniqueInput
    update: XOR<ReadingFeedbackUpdateWithoutAppFileInput, ReadingFeedbackUncheckedUpdateWithoutAppFileInput>
    create: XOR<ReadingFeedbackCreateWithoutAppFileInput, ReadingFeedbackUncheckedCreateWithoutAppFileInput>
  }

  export type ReadingFeedbackUpdateWithWhereUniqueWithoutAppFileInput = {
    where: ReadingFeedbackWhereUniqueInput
    data: XOR<ReadingFeedbackUpdateWithoutAppFileInput, ReadingFeedbackUncheckedUpdateWithoutAppFileInput>
  }

  export type ReadingFeedbackUpdateManyWithWhereWithoutAppFileInput = {
    where: ReadingFeedbackScalarWhereInput
    data: XOR<ReadingFeedbackUpdateManyMutationInput, ReadingFeedbackUncheckedUpdateManyWithoutAppFileInput>
  }

  export type ReadingFeedbackScalarWhereInput = {
    AND?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
    OR?: ReadingFeedbackScalarWhereInput[]
    NOT?: ReadingFeedbackScalarWhereInput | ReadingFeedbackScalarWhereInput[]
    id?: StringFilter<"ReadingFeedback"> | string
    readingManuscriptId?: StringFilter<"ReadingFeedback"> | string
    feedbackFileId?: StringFilter<"ReadingFeedback"> | string
    userId?: StringFilter<"ReadingFeedback"> | string
    createdAt?: DateTimeFilter<"ReadingFeedback"> | Date | string
    updatedAt?: DateTimeFilter<"ReadingFeedback"> | Date | string
  }

  export type UserCreateWithoutReadingInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    group?: GroupCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReadingInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReadingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReadingInput, UserUncheckedCreateWithoutReadingInput>
  }

  export type ReadingAuthorCreateWithoutReadingInput = {
    id?: string
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutReadingAuthorInput
    readingManuscript?: ReadingManuscriptCreateNestedManyWithoutReadingAuthorInput
  }

  export type ReadingAuthorUncheckedCreateWithoutReadingInput = {
    id?: string
    authorId: string
    joinedAt?: Date | string
    readingManuscript?: ReadingManuscriptUncheckedCreateNestedManyWithoutReadingAuthorInput
  }

  export type ReadingAuthorCreateOrConnectWithoutReadingInput = {
    where: ReadingAuthorWhereUniqueInput
    create: XOR<ReadingAuthorCreateWithoutReadingInput, ReadingAuthorUncheckedCreateWithoutReadingInput>
  }

  export type ReadingAuthorCreateManyReadingInputEnvelope = {
    data: ReadingAuthorCreateManyReadingInput | ReadingAuthorCreateManyReadingInput[]
    skipDuplicates?: boolean
  }

  export type GroupCreateWithoutReadingInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlCreateNestedManyWithoutGroupInput
    user: UserCreateNestedOneWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutReadingInput = {
    id?: string
    creatorUserId: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressUncheckedCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsUncheckedCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutReadingInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutReadingInput, GroupUncheckedCreateWithoutReadingInput>
  }

  export type GroupAddressCreateWithoutReadingInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
    group?: GroupCreateNestedOneWithoutGroupAddressInput
  }

  export type GroupAddressUncheckedCreateWithoutReadingInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
    groupId: string
  }

  export type GroupAddressCreateOrConnectWithoutReadingInput = {
    where: GroupAddressWhereUniqueInput
    create: XOR<GroupAddressCreateWithoutReadingInput, GroupAddressUncheckedCreateWithoutReadingInput>
  }

  export type UserUpsertWithoutReadingInput = {
    update: XOR<UserUpdateWithoutReadingInput, UserUncheckedUpdateWithoutReadingInput>
    create: XOR<UserCreateWithoutReadingInput, UserUncheckedCreateWithoutReadingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReadingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReadingInput, UserUncheckedUpdateWithoutReadingInput>
  }

  export type UserUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    group?: GroupUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReadingAuthorUpsertWithWhereUniqueWithoutReadingInput = {
    where: ReadingAuthorWhereUniqueInput
    update: XOR<ReadingAuthorUpdateWithoutReadingInput, ReadingAuthorUncheckedUpdateWithoutReadingInput>
    create: XOR<ReadingAuthorCreateWithoutReadingInput, ReadingAuthorUncheckedCreateWithoutReadingInput>
  }

  export type ReadingAuthorUpdateWithWhereUniqueWithoutReadingInput = {
    where: ReadingAuthorWhereUniqueInput
    data: XOR<ReadingAuthorUpdateWithoutReadingInput, ReadingAuthorUncheckedUpdateWithoutReadingInput>
  }

  export type ReadingAuthorUpdateManyWithWhereWithoutReadingInput = {
    where: ReadingAuthorScalarWhereInput
    data: XOR<ReadingAuthorUpdateManyMutationInput, ReadingAuthorUncheckedUpdateManyWithoutReadingInput>
  }

  export type ReadingAuthorScalarWhereInput = {
    AND?: ReadingAuthorScalarWhereInput | ReadingAuthorScalarWhereInput[]
    OR?: ReadingAuthorScalarWhereInput[]
    NOT?: ReadingAuthorScalarWhereInput | ReadingAuthorScalarWhereInput[]
    id?: StringFilter<"ReadingAuthor"> | string
    readingId?: StringFilter<"ReadingAuthor"> | string
    authorId?: StringFilter<"ReadingAuthor"> | string
    joinedAt?: DateTimeFilter<"ReadingAuthor"> | Date | string
  }

  export type GroupUpsertWithoutReadingInput = {
    update: XOR<GroupUpdateWithoutReadingInput, GroupUncheckedUpdateWithoutReadingInput>
    create: XOR<GroupCreateWithoutReadingInput, GroupUncheckedCreateWithoutReadingInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutReadingInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutReadingInput, GroupUncheckedUpdateWithoutReadingInput>
  }

  export type GroupUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUpdateManyWithoutGroupNestedInput
    user?: UserUpdateOneRequiredWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorUserId?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUncheckedUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUncheckedUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUncheckedUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupAddressUpsertWithoutReadingInput = {
    update: XOR<GroupAddressUpdateWithoutReadingInput, GroupAddressUncheckedUpdateWithoutReadingInput>
    create: XOR<GroupAddressCreateWithoutReadingInput, GroupAddressUncheckedCreateWithoutReadingInput>
    where?: GroupAddressWhereInput
  }

  export type GroupAddressUpdateToOneWithWhereWithoutReadingInput = {
    where?: GroupAddressWhereInput
    data: XOR<GroupAddressUpdateWithoutReadingInput, GroupAddressUncheckedUpdateWithoutReadingInput>
  }

  export type GroupAddressUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneWithoutGroupAddressNestedInput
  }

  export type GroupAddressUncheckedUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type ReadingCreateWithoutReadingAuthorInput = {
    id?: string
    name: string
    createdAt?: Date | string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    user: UserCreateNestedOneWithoutReadingInput
    group: GroupCreateNestedOneWithoutReadingInput
    groupAddress?: GroupAddressCreateNestedOneWithoutReadingInput
  }

  export type ReadingUncheckedCreateWithoutReadingAuthorInput = {
    id?: string
    name: string
    groupId: string
    createdAt?: Date | string
    createdUserId: string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    readingAddressId?: string | null
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
  }

  export type ReadingCreateOrConnectWithoutReadingAuthorInput = {
    where: ReadingWhereUniqueInput
    create: XOR<ReadingCreateWithoutReadingAuthorInput, ReadingUncheckedCreateWithoutReadingAuthorInput>
  }

  export type UserCreateWithoutReadingAuthorInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    group?: GroupCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReadingAuthorInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReadingAuthorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReadingAuthorInput, UserUncheckedCreateWithoutReadingAuthorInput>
  }

  export type ReadingManuscriptCreateWithoutReadingAuthorInput = {
    id?: string
    readingAuthorId: string
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutReadingManuscriptInput
    appFile: AppFileCreateNestedOneWithoutReadingManuscriptsInput
  }

  export type ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput = {
    id?: string
    readingAuthorId: string
    appFileId: string
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutReadingManuscriptInput
  }

  export type ReadingManuscriptCreateOrConnectWithoutReadingAuthorInput = {
    where: ReadingManuscriptWhereUniqueInput
    create: XOR<ReadingManuscriptCreateWithoutReadingAuthorInput, ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput>
  }

  export type ReadingManuscriptCreateManyReadingAuthorInputEnvelope = {
    data: ReadingManuscriptCreateManyReadingAuthorInput | ReadingManuscriptCreateManyReadingAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ReadingUpsertWithoutReadingAuthorInput = {
    update: XOR<ReadingUpdateWithoutReadingAuthorInput, ReadingUncheckedUpdateWithoutReadingAuthorInput>
    create: XOR<ReadingCreateWithoutReadingAuthorInput, ReadingUncheckedCreateWithoutReadingAuthorInput>
    where?: ReadingWhereInput
  }

  export type ReadingUpdateToOneWithWhereWithoutReadingAuthorInput = {
    where?: ReadingWhereInput
    data: XOR<ReadingUpdateWithoutReadingAuthorInput, ReadingUncheckedUpdateWithoutReadingAuthorInput>
  }

  export type ReadingUpdateWithoutReadingAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutReadingNestedInput
    group?: GroupUpdateOneRequiredWithoutReadingNestedInput
    groupAddress?: GroupAddressUpdateOneWithoutReadingNestedInput
  }

  export type ReadingUncheckedUpdateWithoutReadingAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUserId?: StringFieldUpdateOperationsInput | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    readingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutReadingAuthorInput = {
    update: XOR<UserUpdateWithoutReadingAuthorInput, UserUncheckedUpdateWithoutReadingAuthorInput>
    create: XOR<UserCreateWithoutReadingAuthorInput, UserUncheckedCreateWithoutReadingAuthorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReadingAuthorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReadingAuthorInput, UserUncheckedUpdateWithoutReadingAuthorInput>
  }

  export type UserUpdateWithoutReadingAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    group?: GroupUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReadingAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReadingManuscriptUpsertWithWhereUniqueWithoutReadingAuthorInput = {
    where: ReadingManuscriptWhereUniqueInput
    update: XOR<ReadingManuscriptUpdateWithoutReadingAuthorInput, ReadingManuscriptUncheckedUpdateWithoutReadingAuthorInput>
    create: XOR<ReadingManuscriptCreateWithoutReadingAuthorInput, ReadingManuscriptUncheckedCreateWithoutReadingAuthorInput>
  }

  export type ReadingManuscriptUpdateWithWhereUniqueWithoutReadingAuthorInput = {
    where: ReadingManuscriptWhereUniqueInput
    data: XOR<ReadingManuscriptUpdateWithoutReadingAuthorInput, ReadingManuscriptUncheckedUpdateWithoutReadingAuthorInput>
  }

  export type ReadingManuscriptUpdateManyWithWhereWithoutReadingAuthorInput = {
    where: ReadingManuscriptScalarWhereInput
    data: XOR<ReadingManuscriptUpdateManyMutationInput, ReadingManuscriptUncheckedUpdateManyWithoutReadingAuthorInput>
  }

  export type AppFileCreateWithoutReadingFeedbackInput = {
    id?: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    user: UserCreateNestedOneWithoutAppFilesInput
    readingManuscripts?: ReadingManuscriptCreateNestedManyWithoutAppFileInput
  }

  export type AppFileUncheckedCreateWithoutReadingFeedbackInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    readingManuscripts?: ReadingManuscriptUncheckedCreateNestedManyWithoutAppFileInput
  }

  export type AppFileCreateOrConnectWithoutReadingFeedbackInput = {
    where: AppFileWhereUniqueInput
    create: XOR<AppFileCreateWithoutReadingFeedbackInput, AppFileUncheckedCreateWithoutReadingFeedbackInput>
  }

  export type UserCreateWithoutReadingFeedbackInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    group?: GroupCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReadingFeedbackInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReadingFeedbackInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReadingFeedbackInput, UserUncheckedCreateWithoutReadingFeedbackInput>
  }

  export type ReadingManuscriptCreateWithoutReadingFeedbackInput = {
    id?: string
    readingAuthorId: string
    readingAuthor: ReadingAuthorCreateNestedOneWithoutReadingManuscriptInput
    appFile: AppFileCreateNestedOneWithoutReadingManuscriptsInput
  }

  export type ReadingManuscriptUncheckedCreateWithoutReadingFeedbackInput = {
    id?: string
    readingId: string
    readingAuthorId: string
    appFileId: string
  }

  export type ReadingManuscriptCreateOrConnectWithoutReadingFeedbackInput = {
    where: ReadingManuscriptWhereUniqueInput
    create: XOR<ReadingManuscriptCreateWithoutReadingFeedbackInput, ReadingManuscriptUncheckedCreateWithoutReadingFeedbackInput>
  }

  export type AppFileUpsertWithoutReadingFeedbackInput = {
    update: XOR<AppFileUpdateWithoutReadingFeedbackInput, AppFileUncheckedUpdateWithoutReadingFeedbackInput>
    create: XOR<AppFileCreateWithoutReadingFeedbackInput, AppFileUncheckedCreateWithoutReadingFeedbackInput>
    where?: AppFileWhereInput
  }

  export type AppFileUpdateToOneWithWhereWithoutReadingFeedbackInput = {
    where?: AppFileWhereInput
    data: XOR<AppFileUpdateWithoutReadingFeedbackInput, AppFileUncheckedUpdateWithoutReadingFeedbackInput>
  }

  export type AppFileUpdateWithoutReadingFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAppFilesNestedInput
    readingManuscripts?: ReadingManuscriptUpdateManyWithoutAppFileNestedInput
  }

  export type AppFileUncheckedUpdateWithoutReadingFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    readingManuscripts?: ReadingManuscriptUncheckedUpdateManyWithoutAppFileNestedInput
  }

  export type UserUpsertWithoutReadingFeedbackInput = {
    update: XOR<UserUpdateWithoutReadingFeedbackInput, UserUncheckedUpdateWithoutReadingFeedbackInput>
    create: XOR<UserCreateWithoutReadingFeedbackInput, UserUncheckedCreateWithoutReadingFeedbackInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReadingFeedbackInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReadingFeedbackInput, UserUncheckedUpdateWithoutReadingFeedbackInput>
  }

  export type UserUpdateWithoutReadingFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    group?: GroupUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReadingFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReadingManuscriptUpsertWithoutReadingFeedbackInput = {
    update: XOR<ReadingManuscriptUpdateWithoutReadingFeedbackInput, ReadingManuscriptUncheckedUpdateWithoutReadingFeedbackInput>
    create: XOR<ReadingManuscriptCreateWithoutReadingFeedbackInput, ReadingManuscriptUncheckedCreateWithoutReadingFeedbackInput>
    where?: ReadingManuscriptWhereInput
  }

  export type ReadingManuscriptUpdateToOneWithWhereWithoutReadingFeedbackInput = {
    where?: ReadingManuscriptWhereInput
    data: XOR<ReadingManuscriptUpdateWithoutReadingFeedbackInput, ReadingManuscriptUncheckedUpdateWithoutReadingFeedbackInput>
  }

  export type ReadingManuscriptUpdateWithoutReadingFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    readingAuthor?: ReadingAuthorUpdateOneRequiredWithoutReadingManuscriptNestedInput
    appFile?: AppFileUpdateOneRequiredWithoutReadingManuscriptsNestedInput
  }

  export type ReadingManuscriptUncheckedUpdateWithoutReadingFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    appFileId?: StringFieldUpdateOperationsInput | string
  }

  export type ReadingFeedbackCreateWithoutReadingManuscriptInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appFile: AppFileCreateNestedOneWithoutReadingFeedbackInput
    user: UserCreateNestedOneWithoutReadingFeedbackInput
  }

  export type ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput = {
    id?: string
    feedbackFileId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingFeedbackCreateOrConnectWithoutReadingManuscriptInput = {
    where: ReadingFeedbackWhereUniqueInput
    create: XOR<ReadingFeedbackCreateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput>
  }

  export type ReadingFeedbackCreateManyReadingManuscriptInputEnvelope = {
    data: ReadingFeedbackCreateManyReadingManuscriptInput | ReadingFeedbackCreateManyReadingManuscriptInput[]
    skipDuplicates?: boolean
  }

  export type ReadingAuthorCreateWithoutReadingManuscriptInput = {
    id?: string
    joinedAt?: Date | string
    reading: ReadingCreateNestedOneWithoutReadingAuthorInput
    user: UserCreateNestedOneWithoutReadingAuthorInput
  }

  export type ReadingAuthorUncheckedCreateWithoutReadingManuscriptInput = {
    id?: string
    readingId: string
    authorId: string
    joinedAt?: Date | string
  }

  export type ReadingAuthorCreateOrConnectWithoutReadingManuscriptInput = {
    where: ReadingAuthorWhereUniqueInput
    create: XOR<ReadingAuthorCreateWithoutReadingManuscriptInput, ReadingAuthorUncheckedCreateWithoutReadingManuscriptInput>
  }

  export type AppFileCreateWithoutReadingManuscriptsInput = {
    id?: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    user: UserCreateNestedOneWithoutAppFilesInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutAppFileInput
  }

  export type AppFileUncheckedCreateWithoutReadingManuscriptsInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutAppFileInput
  }

  export type AppFileCreateOrConnectWithoutReadingManuscriptsInput = {
    where: AppFileWhereUniqueInput
    create: XOR<AppFileCreateWithoutReadingManuscriptsInput, AppFileUncheckedCreateWithoutReadingManuscriptsInput>
  }

  export type ReadingFeedbackUpsertWithWhereUniqueWithoutReadingManuscriptInput = {
    where: ReadingFeedbackWhereUniqueInput
    update: XOR<ReadingFeedbackUpdateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedUpdateWithoutReadingManuscriptInput>
    create: XOR<ReadingFeedbackCreateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedCreateWithoutReadingManuscriptInput>
  }

  export type ReadingFeedbackUpdateWithWhereUniqueWithoutReadingManuscriptInput = {
    where: ReadingFeedbackWhereUniqueInput
    data: XOR<ReadingFeedbackUpdateWithoutReadingManuscriptInput, ReadingFeedbackUncheckedUpdateWithoutReadingManuscriptInput>
  }

  export type ReadingFeedbackUpdateManyWithWhereWithoutReadingManuscriptInput = {
    where: ReadingFeedbackScalarWhereInput
    data: XOR<ReadingFeedbackUpdateManyMutationInput, ReadingFeedbackUncheckedUpdateManyWithoutReadingManuscriptInput>
  }

  export type ReadingAuthorUpsertWithoutReadingManuscriptInput = {
    update: XOR<ReadingAuthorUpdateWithoutReadingManuscriptInput, ReadingAuthorUncheckedUpdateWithoutReadingManuscriptInput>
    create: XOR<ReadingAuthorCreateWithoutReadingManuscriptInput, ReadingAuthorUncheckedCreateWithoutReadingManuscriptInput>
    where?: ReadingAuthorWhereInput
  }

  export type ReadingAuthorUpdateToOneWithWhereWithoutReadingManuscriptInput = {
    where?: ReadingAuthorWhereInput
    data: XOR<ReadingAuthorUpdateWithoutReadingManuscriptInput, ReadingAuthorUncheckedUpdateWithoutReadingManuscriptInput>
  }

  export type ReadingAuthorUpdateWithoutReadingManuscriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reading?: ReadingUpdateOneRequiredWithoutReadingAuthorNestedInput
    user?: UserUpdateOneRequiredWithoutReadingAuthorNestedInput
  }

  export type ReadingAuthorUncheckedUpdateWithoutReadingManuscriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppFileUpsertWithoutReadingManuscriptsInput = {
    update: XOR<AppFileUpdateWithoutReadingManuscriptsInput, AppFileUncheckedUpdateWithoutReadingManuscriptsInput>
    create: XOR<AppFileCreateWithoutReadingManuscriptsInput, AppFileUncheckedCreateWithoutReadingManuscriptsInput>
    where?: AppFileWhereInput
  }

  export type AppFileUpdateToOneWithWhereWithoutReadingManuscriptsInput = {
    where?: AppFileWhereInput
    data: XOR<AppFileUpdateWithoutReadingManuscriptsInput, AppFileUncheckedUpdateWithoutReadingManuscriptsInput>
  }

  export type AppFileUpdateWithoutReadingManuscriptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAppFilesNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutAppFileNestedInput
  }

  export type AppFileUncheckedUpdateWithoutReadingManuscriptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutAppFileNestedInput
  }

  export type GroupAddressCreateWithoutGroupInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
    reading?: ReadingCreateNestedOneWithoutGroupAddressInput
  }

  export type GroupAddressUncheckedCreateWithoutGroupInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
    reading?: ReadingUncheckedCreateNestedOneWithoutGroupAddressInput
  }

  export type GroupAddressCreateOrConnectWithoutGroupInput = {
    where: GroupAddressWhereUniqueInput
    create: XOR<GroupAddressCreateWithoutGroupInput, GroupAddressUncheckedCreateWithoutGroupInput>
  }

  export type GroupAddressCreateManyGroupInputEnvelope = {
    data: GroupAddressCreateManyGroupInput | GroupAddressCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type GroupUserCreateWithoutGroupInput = {
    id?: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutGroupUserInput
  }

  export type GroupUserUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
  }

  export type GroupUserCreateOrConnectWithoutGroupInput = {
    where: GroupUserWhereUniqueInput
    create: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput>
  }

  export type GroupUserCreateManyGroupInputEnvelope = {
    data: GroupUserCreateManyGroupInput | GroupUserCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type GroupNewsCreateWithoutGroupInput = {
    id?: string
    title: string
    content?: string | null
    postedAt?: Date | string
    archived?: boolean
  }

  export type GroupNewsUncheckedCreateWithoutGroupInput = {
    id?: string
    title: string
    content?: string | null
    postedAt?: Date | string
    archived?: boolean
  }

  export type GroupNewsCreateOrConnectWithoutGroupInput = {
    where: GroupNewsWhereUniqueInput
    create: XOR<GroupNewsCreateWithoutGroupInput, GroupNewsUncheckedCreateWithoutGroupInput>
  }

  export type GroupNewsCreateManyGroupInputEnvelope = {
    data: GroupNewsCreateManyGroupInput | GroupNewsCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type ReadingCreateWithoutGroupInput = {
    id?: string
    name: string
    createdAt?: Date | string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    user: UserCreateNestedOneWithoutReadingInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutReadingInput
    groupAddress?: GroupAddressCreateNestedOneWithoutReadingInput
  }

  export type ReadingUncheckedCreateWithoutGroupInput = {
    id?: string
    name: string
    createdAt?: Date | string
    createdUserId: string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    readingAddressId?: string | null
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutReadingInput
  }

  export type ReadingCreateOrConnectWithoutGroupInput = {
    where: ReadingWhereUniqueInput
    create: XOR<ReadingCreateWithoutGroupInput, ReadingUncheckedCreateWithoutGroupInput>
  }

  export type ReadingCreateManyGroupInputEnvelope = {
    data: ReadingCreateManyGroupInput | ReadingCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type GroupUrlCreateWithoutGroupInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type GroupUrlUncheckedCreateWithoutGroupInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type GroupUrlCreateOrConnectWithoutGroupInput = {
    where: GroupUrlWhereUniqueInput
    create: XOR<GroupUrlCreateWithoutGroupInput, GroupUrlUncheckedCreateWithoutGroupInput>
  }

  export type GroupUrlCreateManyGroupInputEnvelope = {
    data: GroupUrlCreateManyGroupInput | GroupUrlCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutGroupInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>
  }

  export type GroupAddressUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupAddressWhereUniqueInput
    update: XOR<GroupAddressUpdateWithoutGroupInput, GroupAddressUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupAddressCreateWithoutGroupInput, GroupAddressUncheckedCreateWithoutGroupInput>
  }

  export type GroupAddressUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupAddressWhereUniqueInput
    data: XOR<GroupAddressUpdateWithoutGroupInput, GroupAddressUncheckedUpdateWithoutGroupInput>
  }

  export type GroupAddressUpdateManyWithWhereWithoutGroupInput = {
    where: GroupAddressScalarWhereInput
    data: XOR<GroupAddressUpdateManyMutationInput, GroupAddressUncheckedUpdateManyWithoutGroupInput>
  }

  export type GroupAddressScalarWhereInput = {
    AND?: GroupAddressScalarWhereInput | GroupAddressScalarWhereInput[]
    OR?: GroupAddressScalarWhereInput[]
    NOT?: GroupAddressScalarWhereInput | GroupAddressScalarWhereInput[]
    id?: StringFilter<"GroupAddress"> | string
    street?: StringFilter<"GroupAddress"> | string
    city?: StringFilter<"GroupAddress"> | string
    state?: StringFilter<"GroupAddress"> | string
    zip?: StringFilter<"GroupAddress"> | string
    groupId?: StringFilter<"GroupAddress"> | string
  }

  export type GroupUserUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupUserWhereUniqueInput
    update: XOR<GroupUserUpdateWithoutGroupInput, GroupUserUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput>
  }

  export type GroupUserUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupUserWhereUniqueInput
    data: XOR<GroupUserUpdateWithoutGroupInput, GroupUserUncheckedUpdateWithoutGroupInput>
  }

  export type GroupUserUpdateManyWithWhereWithoutGroupInput = {
    where: GroupUserScalarWhereInput
    data: XOR<GroupUserUpdateManyMutationInput, GroupUserUncheckedUpdateManyWithoutGroupInput>
  }

  export type GroupUserScalarWhereInput = {
    AND?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
    OR?: GroupUserScalarWhereInput[]
    NOT?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
    id?: StringFilter<"GroupUser"> | string
    userId?: StringFilter<"GroupUser"> | string
    groupId?: StringFilter<"GroupUser"> | string
    isAdmin?: BoolFilter<"GroupUser"> | boolean
    invitedBy?: StringNullableFilter<"GroupUser"> | string | null
    createdAt?: DateTimeFilter<"GroupUser"> | Date | string
  }

  export type GroupNewsUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupNewsWhereUniqueInput
    update: XOR<GroupNewsUpdateWithoutGroupInput, GroupNewsUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupNewsCreateWithoutGroupInput, GroupNewsUncheckedCreateWithoutGroupInput>
  }

  export type GroupNewsUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupNewsWhereUniqueInput
    data: XOR<GroupNewsUpdateWithoutGroupInput, GroupNewsUncheckedUpdateWithoutGroupInput>
  }

  export type GroupNewsUpdateManyWithWhereWithoutGroupInput = {
    where: GroupNewsScalarWhereInput
    data: XOR<GroupNewsUpdateManyMutationInput, GroupNewsUncheckedUpdateManyWithoutGroupInput>
  }

  export type GroupNewsScalarWhereInput = {
    AND?: GroupNewsScalarWhereInput | GroupNewsScalarWhereInput[]
    OR?: GroupNewsScalarWhereInput[]
    NOT?: GroupNewsScalarWhereInput | GroupNewsScalarWhereInput[]
    id?: StringFilter<"GroupNews"> | string
    groupId?: StringFilter<"GroupNews"> | string
    title?: StringFilter<"GroupNews"> | string
    content?: StringNullableFilter<"GroupNews"> | string | null
    postedAt?: DateTimeFilter<"GroupNews"> | Date | string
    archived?: BoolFilter<"GroupNews"> | boolean
  }

  export type ReadingUpsertWithWhereUniqueWithoutGroupInput = {
    where: ReadingWhereUniqueInput
    update: XOR<ReadingUpdateWithoutGroupInput, ReadingUncheckedUpdateWithoutGroupInput>
    create: XOR<ReadingCreateWithoutGroupInput, ReadingUncheckedCreateWithoutGroupInput>
  }

  export type ReadingUpdateWithWhereUniqueWithoutGroupInput = {
    where: ReadingWhereUniqueInput
    data: XOR<ReadingUpdateWithoutGroupInput, ReadingUncheckedUpdateWithoutGroupInput>
  }

  export type ReadingUpdateManyWithWhereWithoutGroupInput = {
    where: ReadingScalarWhereInput
    data: XOR<ReadingUpdateManyMutationInput, ReadingUncheckedUpdateManyWithoutGroupInput>
  }

  export type ReadingScalarWhereInput = {
    AND?: ReadingScalarWhereInput | ReadingScalarWhereInput[]
    OR?: ReadingScalarWhereInput[]
    NOT?: ReadingScalarWhereInput | ReadingScalarWhereInput[]
    id?: StringFilter<"Reading"> | string
    name?: StringFilter<"Reading"> | string
    groupId?: StringFilter<"Reading"> | string
    createdAt?: DateTimeFilter<"Reading"> | Date | string
    createdUserId?: StringFilter<"Reading"> | string
    readingDate?: DateTimeFilter<"Reading"> | Date | string
    readingStartTime?: StringFilter<"Reading"> | string
    readingEndTime?: StringFilter<"Reading"> | string
    readingAddressId?: StringNullableFilter<"Reading"> | string | null
    submissionDeadline?: DateTimeFilter<"Reading"> | Date | string
    description?: StringFilter<"Reading"> | string
    minDaysBetweenReads?: IntFilter<"Reading"> | number
    maxConsecutiveReads?: IntFilter<"Reading"> | number
  }

  export type GroupUrlUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupUrlWhereUniqueInput
    update: XOR<GroupUrlUpdateWithoutGroupInput, GroupUrlUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupUrlCreateWithoutGroupInput, GroupUrlUncheckedCreateWithoutGroupInput>
  }

  export type GroupUrlUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupUrlWhereUniqueInput
    data: XOR<GroupUrlUpdateWithoutGroupInput, GroupUrlUncheckedUpdateWithoutGroupInput>
  }

  export type GroupUrlUpdateManyWithWhereWithoutGroupInput = {
    where: GroupUrlScalarWhereInput
    data: XOR<GroupUrlUpdateManyMutationInput, GroupUrlUncheckedUpdateManyWithoutGroupInput>
  }

  export type GroupUrlScalarWhereInput = {
    AND?: GroupUrlScalarWhereInput | GroupUrlScalarWhereInput[]
    OR?: GroupUrlScalarWhereInput[]
    NOT?: GroupUrlScalarWhereInput | GroupUrlScalarWhereInput[]
    id?: StringFilter<"GroupUrl"> | string
    url?: StringFilter<"GroupUrl"> | string
    groupId?: StringFilter<"GroupUrl"> | string
    urlType?: EnumUrlTypeFilter<"GroupUrl"> | $Enums.UrlType
    createdAt?: DateTimeFilter<"GroupUrl"> | Date | string
  }

  export type UserUpsertWithoutGroupInput = {
    update: XOR<UserUpdateWithoutGroupInput, UserUncheckedUpdateWithoutGroupInput>
    create: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupInput, UserUncheckedUpdateWithoutGroupInput>
  }

  export type UserUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GroupCreateWithoutGroupAddressInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsCreateNestedManyWithoutGroupInput
    reading?: ReadingCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlCreateNestedManyWithoutGroupInput
    user: UserCreateNestedOneWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutGroupAddressInput = {
    id?: string
    creatorUserId: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsUncheckedCreateNestedManyWithoutGroupInput
    reading?: ReadingUncheckedCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutGroupAddressInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutGroupAddressInput, GroupUncheckedCreateWithoutGroupAddressInput>
  }

  export type ReadingCreateWithoutGroupAddressInput = {
    id?: string
    name: string
    createdAt?: Date | string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    user: UserCreateNestedOneWithoutReadingInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutReadingInput
    group: GroupCreateNestedOneWithoutReadingInput
  }

  export type ReadingUncheckedCreateWithoutGroupAddressInput = {
    id?: string
    name: string
    groupId: string
    createdAt?: Date | string
    createdUserId: string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutReadingInput
  }

  export type ReadingCreateOrConnectWithoutGroupAddressInput = {
    where: ReadingWhereUniqueInput
    create: XOR<ReadingCreateWithoutGroupAddressInput, ReadingUncheckedCreateWithoutGroupAddressInput>
  }

  export type GroupUpsertWithoutGroupAddressInput = {
    update: XOR<GroupUpdateWithoutGroupAddressInput, GroupUncheckedUpdateWithoutGroupAddressInput>
    create: XOR<GroupCreateWithoutGroupAddressInput, GroupUncheckedCreateWithoutGroupAddressInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutGroupAddressInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutGroupAddressInput, GroupUncheckedUpdateWithoutGroupAddressInput>
  }

  export type GroupUpdateWithoutGroupAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUpdateManyWithoutGroupNestedInput
    reading?: ReadingUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUpdateManyWithoutGroupNestedInput
    user?: UserUpdateOneRequiredWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutGroupAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorUserId?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUncheckedUpdateManyWithoutGroupNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type ReadingUpsertWithoutGroupAddressInput = {
    update: XOR<ReadingUpdateWithoutGroupAddressInput, ReadingUncheckedUpdateWithoutGroupAddressInput>
    create: XOR<ReadingCreateWithoutGroupAddressInput, ReadingUncheckedCreateWithoutGroupAddressInput>
    where?: ReadingWhereInput
  }

  export type ReadingUpdateToOneWithWhereWithoutGroupAddressInput = {
    where?: ReadingWhereInput
    data: XOR<ReadingUpdateWithoutGroupAddressInput, ReadingUncheckedUpdateWithoutGroupAddressInput>
  }

  export type ReadingUpdateWithoutGroupAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutReadingNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutReadingNestedInput
    group?: GroupUpdateOneRequiredWithoutReadingNestedInput
  }

  export type ReadingUncheckedUpdateWithoutGroupAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUserId?: StringFieldUpdateOperationsInput | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutReadingNestedInput
  }

  export type GroupCreateWithoutGroupNewsInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserCreateNestedManyWithoutGroupInput
    reading?: ReadingCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlCreateNestedManyWithoutGroupInput
    user: UserCreateNestedOneWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutGroupNewsInput = {
    id?: string
    creatorUserId: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressUncheckedCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutGroupInput
    reading?: ReadingUncheckedCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutGroupNewsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutGroupNewsInput, GroupUncheckedCreateWithoutGroupNewsInput>
  }

  export type GroupUpsertWithoutGroupNewsInput = {
    update: XOR<GroupUpdateWithoutGroupNewsInput, GroupUncheckedUpdateWithoutGroupNewsInput>
    create: XOR<GroupCreateWithoutGroupNewsInput, GroupUncheckedCreateWithoutGroupNewsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutGroupNewsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutGroupNewsInput, GroupUncheckedUpdateWithoutGroupNewsInput>
  }

  export type GroupUpdateWithoutGroupNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUpdateManyWithoutGroupNestedInput
    reading?: ReadingUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUpdateManyWithoutGroupNestedInput
    user?: UserUpdateOneRequiredWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutGroupNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorUserId?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUncheckedUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUncheckedUpdateManyWithoutGroupNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type UserCreateWithoutGroupUserInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupUserInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupUserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupUserInput, UserUncheckedCreateWithoutGroupUserInput>
  }

  export type GroupCreateWithoutGroupUserInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsCreateNestedManyWithoutGroupInput
    reading?: ReadingCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlCreateNestedManyWithoutGroupInput
    user: UserCreateNestedOneWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutGroupUserInput = {
    id?: string
    creatorUserId: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressUncheckedCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsUncheckedCreateNestedManyWithoutGroupInput
    reading?: ReadingUncheckedCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutGroupUserInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutGroupUserInput, GroupUncheckedCreateWithoutGroupUserInput>
  }

  export type UserUpsertWithoutGroupUserInput = {
    update: XOR<UserUpdateWithoutGroupUserInput, UserUncheckedUpdateWithoutGroupUserInput>
    create: XOR<UserCreateWithoutGroupUserInput, UserUncheckedCreateWithoutGroupUserInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupUserInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupUserInput, UserUncheckedUpdateWithoutGroupUserInput>
  }

  export type UserUpdateWithoutGroupUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GroupUpsertWithoutGroupUserInput = {
    update: XOR<GroupUpdateWithoutGroupUserInput, GroupUncheckedUpdateWithoutGroupUserInput>
    create: XOR<GroupCreateWithoutGroupUserInput, GroupUncheckedCreateWithoutGroupUserInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutGroupUserInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutGroupUserInput, GroupUncheckedUpdateWithoutGroupUserInput>
  }

  export type GroupUpdateWithoutGroupUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUpdateManyWithoutGroupNestedInput
    reading?: ReadingUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUpdateManyWithoutGroupNestedInput
    user?: UserUpdateOneRequiredWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutGroupUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorUserId?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUncheckedUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUncheckedUpdateManyWithoutGroupNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateWithoutGroupUrlInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsCreateNestedManyWithoutGroupInput
    reading?: ReadingCreateNestedManyWithoutGroupInput
    user: UserCreateNestedOneWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutGroupUrlInput = {
    id?: string
    creatorUserId: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressUncheckedCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsUncheckedCreateNestedManyWithoutGroupInput
    reading?: ReadingUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutGroupUrlInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutGroupUrlInput, GroupUncheckedCreateWithoutGroupUrlInput>
  }

  export type GroupUpsertWithoutGroupUrlInput = {
    update: XOR<GroupUpdateWithoutGroupUrlInput, GroupUncheckedUpdateWithoutGroupUrlInput>
    create: XOR<GroupCreateWithoutGroupUrlInput, GroupUncheckedCreateWithoutGroupUrlInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutGroupUrlInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutGroupUrlInput, GroupUncheckedUpdateWithoutGroupUrlInput>
  }

  export type GroupUpdateWithoutGroupUrlInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUpdateManyWithoutGroupNestedInput
    reading?: ReadingUpdateManyWithoutGroupNestedInput
    user?: UserUpdateOneRequiredWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutGroupUrlInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorUserId?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUncheckedUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUncheckedUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUncheckedUpdateManyWithoutGroupNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupUserCreateWithoutUserInput = {
    id?: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
    group: GroupCreateNestedOneWithoutGroupUserInput
  }

  export type GroupUserUncheckedCreateWithoutUserInput = {
    id?: string
    groupId: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
  }

  export type GroupUserCreateOrConnectWithoutUserInput = {
    where: GroupUserWhereUniqueInput
    create: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput>
  }

  export type GroupUserCreateManyUserInputEnvelope = {
    data: GroupUserCreateManyUserInput | GroupUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GroupCreateWithoutUserInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsCreateNestedManyWithoutGroupInput
    reading?: ReadingCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutUserInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupAddress?: GroupAddressUncheckedCreateNestedManyWithoutGroupInput
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutGroupInput
    groupNews?: GroupNewsUncheckedCreateNestedManyWithoutGroupInput
    reading?: ReadingUncheckedCreateNestedManyWithoutGroupInput
    groupUrl?: GroupUrlUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutUserInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutUserInput, GroupUncheckedCreateWithoutUserInput>
  }

  export type GroupCreateManyUserInputEnvelope = {
    data: GroupCreateManyUserInput | GroupCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReadingCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutReadingInput
    group: GroupCreateNestedOneWithoutReadingInput
    groupAddress?: GroupAddressCreateNestedOneWithoutReadingInput
  }

  export type ReadingUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    groupId: string
    createdAt?: Date | string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    readingAddressId?: string | null
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutReadingInput
  }

  export type ReadingCreateOrConnectWithoutUserInput = {
    where: ReadingWhereUniqueInput
    create: XOR<ReadingCreateWithoutUserInput, ReadingUncheckedCreateWithoutUserInput>
  }

  export type ReadingCreateManyUserInputEnvelope = {
    data: ReadingCreateManyUserInput | ReadingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserProfileCreateWithoutUserInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    bio?: string | null
  }

  export type UserProfileUncheckedCreateWithoutUserInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    bio?: string | null
  }

  export type UserProfileCreateOrConnectWithoutUserInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
  }

  export type AppFileCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    readingManuscripts?: ReadingManuscriptCreateNestedManyWithoutAppFileInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutAppFileInput
  }

  export type AppFileUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
    readingManuscripts?: ReadingManuscriptUncheckedCreateNestedManyWithoutAppFileInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutAppFileInput
  }

  export type AppFileCreateOrConnectWithoutUserInput = {
    where: AppFileWhereUniqueInput
    create: XOR<AppFileCreateWithoutUserInput, AppFileUncheckedCreateWithoutUserInput>
  }

  export type AppFileCreateManyUserInputEnvelope = {
    data: AppFileCreateManyUserInput | AppFileCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUrlCreateWithoutUserInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type UserUrlUncheckedCreateWithoutUserInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type UserUrlCreateOrConnectWithoutUserInput = {
    where: UserUrlWhereUniqueInput
    create: XOR<UserUrlCreateWithoutUserInput, UserUrlUncheckedCreateWithoutUserInput>
  }

  export type UserUrlCreateManyUserInputEnvelope = {
    data: UserUrlCreateManyUserInput | UserUrlCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReadingAuthorCreateWithoutUserInput = {
    id?: string
    joinedAt?: Date | string
    reading: ReadingCreateNestedOneWithoutReadingAuthorInput
    readingManuscript?: ReadingManuscriptCreateNestedManyWithoutReadingAuthorInput
  }

  export type ReadingAuthorUncheckedCreateWithoutUserInput = {
    id?: string
    readingId: string
    joinedAt?: Date | string
    readingManuscript?: ReadingManuscriptUncheckedCreateNestedManyWithoutReadingAuthorInput
  }

  export type ReadingAuthorCreateOrConnectWithoutUserInput = {
    where: ReadingAuthorWhereUniqueInput
    create: XOR<ReadingAuthorCreateWithoutUserInput, ReadingAuthorUncheckedCreateWithoutUserInput>
  }

  export type ReadingAuthorCreateManyUserInputEnvelope = {
    data: ReadingAuthorCreateManyUserInput | ReadingAuthorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReadingFeedbackCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appFile: AppFileCreateNestedOneWithoutReadingFeedbackInput
    readingManuscript: ReadingManuscriptCreateNestedOneWithoutReadingFeedbackInput
  }

  export type ReadingFeedbackUncheckedCreateWithoutUserInput = {
    id?: string
    readingManuscriptId: string
    feedbackFileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingFeedbackCreateOrConnectWithoutUserInput = {
    where: ReadingFeedbackWhereUniqueInput
    create: XOR<ReadingFeedbackCreateWithoutUserInput, ReadingFeedbackUncheckedCreateWithoutUserInput>
  }

  export type ReadingFeedbackCreateManyUserInputEnvelope = {
    data: ReadingFeedbackCreateManyUserInput | ReadingFeedbackCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GroupUserUpsertWithWhereUniqueWithoutUserInput = {
    where: GroupUserWhereUniqueInput
    update: XOR<GroupUserUpdateWithoutUserInput, GroupUserUncheckedUpdateWithoutUserInput>
    create: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput>
  }

  export type GroupUserUpdateWithWhereUniqueWithoutUserInput = {
    where: GroupUserWhereUniqueInput
    data: XOR<GroupUserUpdateWithoutUserInput, GroupUserUncheckedUpdateWithoutUserInput>
  }

  export type GroupUserUpdateManyWithWhereWithoutUserInput = {
    where: GroupUserScalarWhereInput
    data: XOR<GroupUserUpdateManyMutationInput, GroupUserUncheckedUpdateManyWithoutUserInput>
  }

  export type GroupUpsertWithWhereUniqueWithoutUserInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUpdateWithoutUserInput, GroupUncheckedUpdateWithoutUserInput>
    create: XOR<GroupCreateWithoutUserInput, GroupUncheckedCreateWithoutUserInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutUserInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUpdateWithoutUserInput, GroupUncheckedUpdateWithoutUserInput>
  }

  export type GroupUpdateManyWithWhereWithoutUserInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyWithoutUserInput>
  }

  export type GroupScalarWhereInput = {
    AND?: GroupScalarWhereInput | GroupScalarWhereInput[]
    OR?: GroupScalarWhereInput[]
    NOT?: GroupScalarWhereInput | GroupScalarWhereInput[]
    id?: StringFilter<"Group"> | string
    creatorUserId?: StringFilter<"Group"> | string
    groupType?: EnumGroupTypeFilter<"Group"> | $Enums.GroupType
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    imageUrl?: StringNullableFilter<"Group"> | string | null
    websiteUrl?: StringNullableFilter<"Group"> | string | null
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
  }

  export type ReadingUpsertWithWhereUniqueWithoutUserInput = {
    where: ReadingWhereUniqueInput
    update: XOR<ReadingUpdateWithoutUserInput, ReadingUncheckedUpdateWithoutUserInput>
    create: XOR<ReadingCreateWithoutUserInput, ReadingUncheckedCreateWithoutUserInput>
  }

  export type ReadingUpdateWithWhereUniqueWithoutUserInput = {
    where: ReadingWhereUniqueInput
    data: XOR<ReadingUpdateWithoutUserInput, ReadingUncheckedUpdateWithoutUserInput>
  }

  export type ReadingUpdateManyWithWhereWithoutUserInput = {
    where: ReadingScalarWhereInput
    data: XOR<ReadingUpdateManyMutationInput, ReadingUncheckedUpdateManyWithoutUserInput>
  }

  export type UserProfileUpsertWithoutUserInput = {
    update: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AppFileUpsertWithWhereUniqueWithoutUserInput = {
    where: AppFileWhereUniqueInput
    update: XOR<AppFileUpdateWithoutUserInput, AppFileUncheckedUpdateWithoutUserInput>
    create: XOR<AppFileCreateWithoutUserInput, AppFileUncheckedCreateWithoutUserInput>
  }

  export type AppFileUpdateWithWhereUniqueWithoutUserInput = {
    where: AppFileWhereUniqueInput
    data: XOR<AppFileUpdateWithoutUserInput, AppFileUncheckedUpdateWithoutUserInput>
  }

  export type AppFileUpdateManyWithWhereWithoutUserInput = {
    where: AppFileScalarWhereInput
    data: XOR<AppFileUpdateManyMutationInput, AppFileUncheckedUpdateManyWithoutUserInput>
  }

  export type AppFileScalarWhereInput = {
    AND?: AppFileScalarWhereInput | AppFileScalarWhereInput[]
    OR?: AppFileScalarWhereInput[]
    NOT?: AppFileScalarWhereInput | AppFileScalarWhereInput[]
    id?: StringFilter<"AppFile"> | string
    userId?: StringFilter<"AppFile"> | string
    title?: StringFilter<"AppFile"> | string
    description?: StringNullableFilter<"AppFile"> | string | null
    filename?: StringFilter<"AppFile"> | string
    documentType?: EnumDocumentTypeFilter<"AppFile"> | $Enums.DocumentType
    mimetype?: EnumFileTypeFilter<"AppFile"> | $Enums.FileType
    url?: StringFilter<"AppFile"> | string
    uploadedAt?: DateTimeFilter<"AppFile"> | Date | string
    workType?: EnumWorkTypeNullableFilter<"AppFile"> | $Enums.WorkType | null
    wordCount?: IntNullableFilter<"AppFile"> | number | null
    pageCount?: IntNullableFilter<"AppFile"> | number | null
    genre?: EnumGenreNullableFilter<"AppFile"> | $Enums.Genre | null
    manuscriptIsVisible?: BoolFilter<"AppFile"> | boolean
  }

  export type UserUrlUpsertWithWhereUniqueWithoutUserInput = {
    where: UserUrlWhereUniqueInput
    update: XOR<UserUrlUpdateWithoutUserInput, UserUrlUncheckedUpdateWithoutUserInput>
    create: XOR<UserUrlCreateWithoutUserInput, UserUrlUncheckedCreateWithoutUserInput>
  }

  export type UserUrlUpdateWithWhereUniqueWithoutUserInput = {
    where: UserUrlWhereUniqueInput
    data: XOR<UserUrlUpdateWithoutUserInput, UserUrlUncheckedUpdateWithoutUserInput>
  }

  export type UserUrlUpdateManyWithWhereWithoutUserInput = {
    where: UserUrlScalarWhereInput
    data: XOR<UserUrlUpdateManyMutationInput, UserUrlUncheckedUpdateManyWithoutUserInput>
  }

  export type UserUrlScalarWhereInput = {
    AND?: UserUrlScalarWhereInput | UserUrlScalarWhereInput[]
    OR?: UserUrlScalarWhereInput[]
    NOT?: UserUrlScalarWhereInput | UserUrlScalarWhereInput[]
    id?: StringFilter<"UserUrl"> | string
    url?: StringFilter<"UserUrl"> | string
    userId?: StringFilter<"UserUrl"> | string
    urlType?: EnumUrlTypeFilter<"UserUrl"> | $Enums.UrlType
    createdAt?: DateTimeFilter<"UserUrl"> | Date | string
  }

  export type ReadingAuthorUpsertWithWhereUniqueWithoutUserInput = {
    where: ReadingAuthorWhereUniqueInput
    update: XOR<ReadingAuthorUpdateWithoutUserInput, ReadingAuthorUncheckedUpdateWithoutUserInput>
    create: XOR<ReadingAuthorCreateWithoutUserInput, ReadingAuthorUncheckedCreateWithoutUserInput>
  }

  export type ReadingAuthorUpdateWithWhereUniqueWithoutUserInput = {
    where: ReadingAuthorWhereUniqueInput
    data: XOR<ReadingAuthorUpdateWithoutUserInput, ReadingAuthorUncheckedUpdateWithoutUserInput>
  }

  export type ReadingAuthorUpdateManyWithWhereWithoutUserInput = {
    where: ReadingAuthorScalarWhereInput
    data: XOR<ReadingAuthorUpdateManyMutationInput, ReadingAuthorUncheckedUpdateManyWithoutUserInput>
  }

  export type ReadingFeedbackUpsertWithWhereUniqueWithoutUserInput = {
    where: ReadingFeedbackWhereUniqueInput
    update: XOR<ReadingFeedbackUpdateWithoutUserInput, ReadingFeedbackUncheckedUpdateWithoutUserInput>
    create: XOR<ReadingFeedbackCreateWithoutUserInput, ReadingFeedbackUncheckedCreateWithoutUserInput>
  }

  export type ReadingFeedbackUpdateWithWhereUniqueWithoutUserInput = {
    where: ReadingFeedbackWhereUniqueInput
    data: XOR<ReadingFeedbackUpdateWithoutUserInput, ReadingFeedbackUncheckedUpdateWithoutUserInput>
  }

  export type ReadingFeedbackUpdateManyWithWhereWithoutUserInput = {
    where: ReadingFeedbackScalarWhereInput
    data: XOR<ReadingFeedbackUpdateManyMutationInput, ReadingFeedbackUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutUserProfileInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    group?: GroupCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    urls?: UserUrlCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserProfileInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    urls?: UserUrlUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
  }

  export type UserUpsertWithoutUserProfileInput = {
    update: XOR<UserUpdateWithoutUserProfileInput, UserUncheckedUpdateWithoutUserProfileInput>
    create: XOR<UserCreateWithoutUserProfileInput, UserUncheckedCreateWithoutUserProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserProfileInput, UserUncheckedUpdateWithoutUserProfileInput>
  }

  export type UserUpdateWithoutUserProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    group?: GroupUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    urls?: UserUrlUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    urls?: UserUrlUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutUrlsInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserCreateNestedManyWithoutUserInput
    group?: GroupCreateNestedManyWithoutUserInput
    reading?: ReadingCreateNestedManyWithoutUserInput
    userProfile?: UserProfileCreateNestedOneWithoutUserInput
    appFiles?: AppFileCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUrlsInput = {
    id?: string
    superTokensId: string
    email: string
    role?: $Enums.Role
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupUser?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    group?: GroupUncheckedCreateNestedManyWithoutUserInput
    reading?: ReadingUncheckedCreateNestedManyWithoutUserInput
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    appFiles?: AppFileUncheckedCreateNestedManyWithoutUserInput
    readingAuthor?: ReadingAuthorUncheckedCreateNestedManyWithoutUserInput
    readingFeedback?: ReadingFeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUrlsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUrlsInput, UserUncheckedCreateWithoutUrlsInput>
  }

  export type UserUpsertWithoutUrlsInput = {
    update: XOR<UserUpdateWithoutUrlsInput, UserUncheckedUpdateWithoutUrlsInput>
    create: XOR<UserCreateWithoutUrlsInput, UserUncheckedCreateWithoutUrlsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUrlsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUrlsInput, UserUncheckedUpdateWithoutUrlsInput>
  }

  export type UserUpdateWithoutUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUpdateManyWithoutUserNestedInput
    group?: GroupUpdateManyWithoutUserNestedInput
    reading?: ReadingUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    superTokensId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupUser?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    group?: GroupUncheckedUpdateManyWithoutUserNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutUserNestedInput
    userProfile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    appFiles?: AppFileUncheckedUpdateManyWithoutUserNestedInput
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutUserNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReadingManuscriptCreateManyAppFileInput = {
    id?: string
    readingId: string
    readingAuthorId: string
  }

  export type ReadingFeedbackCreateManyAppFileInput = {
    id?: string
    readingManuscriptId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingManuscriptUpdateWithoutAppFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    readingFeedback?: ReadingFeedbackUpdateManyWithoutReadingManuscriptNestedInput
    readingAuthor?: ReadingAuthorUpdateOneRequiredWithoutReadingManuscriptNestedInput
  }

  export type ReadingManuscriptUncheckedUpdateWithoutAppFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutReadingManuscriptNestedInput
  }

  export type ReadingManuscriptUncheckedUpdateManyWithoutAppFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReadingFeedbackUpdateWithoutAppFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReadingFeedbackNestedInput
    readingManuscript?: ReadingManuscriptUpdateOneRequiredWithoutReadingFeedbackNestedInput
  }

  export type ReadingFeedbackUncheckedUpdateWithoutAppFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingManuscriptId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingFeedbackUncheckedUpdateManyWithoutAppFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingManuscriptId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingAuthorCreateManyReadingInput = {
    id?: string
    authorId: string
    joinedAt?: Date | string
  }

  export type ReadingAuthorUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReadingAuthorNestedInput
    readingManuscript?: ReadingManuscriptUpdateManyWithoutReadingAuthorNestedInput
  }

  export type ReadingAuthorUncheckedUpdateWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingManuscript?: ReadingManuscriptUncheckedUpdateManyWithoutReadingAuthorNestedInput
  }

  export type ReadingAuthorUncheckedUpdateManyWithoutReadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingManuscriptCreateManyReadingAuthorInput = {
    id?: string
    readingAuthorId: string
    appFileId: string
  }

  export type ReadingManuscriptUpdateWithoutReadingAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    readingFeedback?: ReadingFeedbackUpdateManyWithoutReadingManuscriptNestedInput
    appFile?: AppFileUpdateOneRequiredWithoutReadingManuscriptsNestedInput
  }

  export type ReadingManuscriptUncheckedUpdateWithoutReadingAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    appFileId?: StringFieldUpdateOperationsInput | string
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutReadingManuscriptNestedInput
  }

  export type ReadingManuscriptUncheckedUpdateManyWithoutReadingAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingAuthorId?: StringFieldUpdateOperationsInput | string
    appFileId?: StringFieldUpdateOperationsInput | string
  }

  export type ReadingFeedbackCreateManyReadingManuscriptInput = {
    id?: string
    feedbackFileId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingFeedbackUpdateWithoutReadingManuscriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appFile?: AppFileUpdateOneRequiredWithoutReadingFeedbackNestedInput
    user?: UserUpdateOneRequiredWithoutReadingFeedbackNestedInput
  }

  export type ReadingFeedbackUncheckedUpdateWithoutReadingManuscriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackFileId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingFeedbackUncheckedUpdateManyWithoutReadingManuscriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackFileId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupAddressCreateManyGroupInput = {
    id?: string
    street: string
    city: string
    state: string
    zip: string
  }

  export type GroupUserCreateManyGroupInput = {
    id?: string
    userId: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
  }

  export type GroupNewsCreateManyGroupInput = {
    id?: string
    title: string
    content?: string | null
    postedAt?: Date | string
    archived?: boolean
  }

  export type ReadingCreateManyGroupInput = {
    id?: string
    name: string
    createdAt?: Date | string
    createdUserId: string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    readingAddressId?: string | null
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
  }

  export type GroupUrlCreateManyGroupInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type GroupAddressUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    reading?: ReadingUpdateOneWithoutGroupAddressNestedInput
  }

  export type GroupAddressUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    reading?: ReadingUncheckedUpdateOneWithoutGroupAddressNestedInput
  }

  export type GroupAddressUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type GroupUserUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGroupUserNestedInput
  }

  export type GroupUserUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupNewsUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupNewsUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupNewsUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReadingUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutReadingNestedInput
    readingAuthor?: ReadingAuthorUpdateManyWithoutReadingNestedInput
    groupAddress?: GroupAddressUpdateOneWithoutReadingNestedInput
  }

  export type ReadingUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUserId?: StringFieldUpdateOperationsInput | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    readingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutReadingNestedInput
  }

  export type ReadingUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUserId?: StringFieldUpdateOperationsInput | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    readingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
  }

  export type GroupUrlUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUrlUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUrlUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserCreateManyUserInput = {
    id?: string
    groupId: string
    isAdmin?: boolean
    invitedBy?: string | null
    createdAt?: Date | string
  }

  export type GroupCreateManyUserInput = {
    id?: string
    groupType?: $Enums.GroupType
    name: string
    description?: string | null
    imageUrl?: string | null
    websiteUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReadingCreateManyUserInput = {
    id?: string
    name: string
    groupId: string
    createdAt?: Date | string
    readingDate: Date | string
    readingStartTime: string
    readingEndTime: string
    readingAddressId?: string | null
    submissionDeadline: Date | string
    description: string
    minDaysBetweenReads?: number
    maxConsecutiveReads?: number
  }

  export type AppFileCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    filename: string
    documentType?: $Enums.DocumentType
    mimetype?: $Enums.FileType
    url: string
    uploadedAt?: Date | string
    workType?: $Enums.WorkType | null
    wordCount?: number | null
    pageCount?: number | null
    genre?: $Enums.Genre | null
    manuscriptIsVisible?: boolean
  }

  export type UserUrlCreateManyUserInput = {
    id?: string
    url: string
    urlType?: $Enums.UrlType
    createdAt?: Date | string
  }

  export type ReadingAuthorCreateManyUserInput = {
    id?: string
    readingId: string
    joinedAt?: Date | string
  }

  export type ReadingFeedbackCreateManyUserInput = {
    id?: string
    readingManuscriptId: string
    feedbackFileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutGroupUserNestedInput
  }

  export type GroupUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    invitedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUpdateManyWithoutGroupNestedInput
    reading?: ReadingUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupAddress?: GroupAddressUncheckedUpdateManyWithoutGroupNestedInput
    groupUser?: GroupUserUncheckedUpdateManyWithoutGroupNestedInput
    groupNews?: GroupNewsUncheckedUpdateManyWithoutGroupNestedInput
    reading?: ReadingUncheckedUpdateManyWithoutGroupNestedInput
    groupUrl?: GroupUrlUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupType?: EnumGroupTypeFieldUpdateOperationsInput | $Enums.GroupType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    readingAuthor?: ReadingAuthorUpdateManyWithoutReadingNestedInput
    group?: GroupUpdateOneRequiredWithoutReadingNestedInput
    groupAddress?: GroupAddressUpdateOneWithoutReadingNestedInput
  }

  export type ReadingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    readingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
    readingAuthor?: ReadingAuthorUncheckedUpdateManyWithoutReadingNestedInput
  }

  export type ReadingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    readingStartTime?: StringFieldUpdateOperationsInput | string
    readingEndTime?: StringFieldUpdateOperationsInput | string
    readingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    minDaysBetweenReads?: IntFieldUpdateOperationsInput | number
    maxConsecutiveReads?: IntFieldUpdateOperationsInput | number
  }

  export type AppFileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    readingManuscripts?: ReadingManuscriptUpdateManyWithoutAppFileNestedInput
    readingFeedback?: ReadingFeedbackUpdateManyWithoutAppFileNestedInput
  }

  export type AppFileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
    readingManuscripts?: ReadingManuscriptUncheckedUpdateManyWithoutAppFileNestedInput
    readingFeedback?: ReadingFeedbackUncheckedUpdateManyWithoutAppFileNestedInput
  }

  export type AppFileUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    mimetype?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workType?: NullableEnumWorkTypeFieldUpdateOperationsInput | $Enums.WorkType | null
    wordCount?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    manuscriptIsVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUrlUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUrlUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUrlUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: EnumUrlTypeFieldUpdateOperationsInput | $Enums.UrlType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingAuthorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reading?: ReadingUpdateOneRequiredWithoutReadingAuthorNestedInput
    readingManuscript?: ReadingManuscriptUpdateManyWithoutReadingAuthorNestedInput
  }

  export type ReadingAuthorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readingManuscript?: ReadingManuscriptUncheckedUpdateManyWithoutReadingAuthorNestedInput
  }

  export type ReadingAuthorUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingFeedbackUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appFile?: AppFileUpdateOneRequiredWithoutReadingFeedbackNestedInput
    readingManuscript?: ReadingManuscriptUpdateOneRequiredWithoutReadingFeedbackNestedInput
  }

  export type ReadingFeedbackUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingManuscriptId?: StringFieldUpdateOperationsInput | string
    feedbackFileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadingFeedbackUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    readingManuscriptId?: StringFieldUpdateOperationsInput | string
    feedbackFileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}