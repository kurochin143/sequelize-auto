import { ColumnDescription, Dialect } from "sequelize/types";
import { FKSpec } from "./dialects/dialect-options";
export interface Table {
    name?: string;
    table_name: string;
    table_schema?: string;
}
export interface Field extends ColumnDescription {
    foreignKey: any;
    special: any[];
    elementType: string;
    unique: boolean;
}
export interface IndexField {
    /** field name */
    attribute: string;
    collate: string;
    length: string;
    order: string;
}
export interface IndexSpec {
    /** name of index */
    name: string;
    /** whether index is primary key */
    primary: boolean;
    unique: boolean;
    fields: IndexField[];
    /** postgres only */
    indkey: string;
    /** postgres only */
    definition: string;
    /** mysql only */
    tableName: string;
    /** mysql only - 'BTREE' */
    type: string;
}
/** Relationship between two models, based on foreign keys */
export interface Relation {
    /** name of parent table, e.g. customers */
    parentTable: string;
    /** name of parent class, e.g. Customer */
    parentModel: string;
    /** name of property on child class that refers to parent, e.g. customer */
    parentProp: string;
    /** foreign key name */
    parentId: string;
    /** name of child table, e.g. orders */
    childTable: string;
    /** name of child class, e.g. Order */
    childModel: string;
    /** name of property on parent class that refers to children, e.g. orders */
    childProp: string;
    /** foreign key on child entity (many-to-many only) */
    childId?: string;
    /** join entity for many-to-many */
    joinModel?: string;
    /** One-to-One vs One-to-Many */
    isOne: boolean;
    /** Many-to-Many */
    isM2M: boolean;
}
export declare class TableData {
    /** Fields for each table; indexed by schemaName.tableName */
    tables: {
        [tableName: string]: {
            [fieldName: string]: ColumnDescription;
        };
    };
    /** Foreign keys for each table; indexed by schemaName.tableName */
    foreignKeys: {
        [tableName: string]: {
            [fieldName: string]: FKSpec;
        };
    };
    /** Flag `true` for each table that has any trigger.  This affects how Sequelize performs updates. */
    hasTriggerTables: {
        [tableName: string]: boolean;
    };
    /** Indexes for each table; indexed by schemaName.tableName */
    indexes: {
        [tableName: string]: IndexSpec[];
    };
    /** Relations between models, computed from foreign keys */
    relations: Relation[];
    /** Text to be written to the model files, indexed by schemaName.tableName */
    text?: {
        [name: string]: string;
    };
    constructor();
}
/** Split schema.table into [schema, table] */
export declare function qNameSplit(qname: string): (string | null)[];
/** Get combined schema.table name */
export declare function qNameJoin(schema: string | undefined, table: string | undefined): string;
/** Language of output model files */
export declare type LangOption = "es5" | "es6" | "esm" | "ts" | "esmd";
/** "c" camelCase |
 * "l" lower_case |
 * "o" original (db) |
 * "p" PascalCase |
 * "u" UPPER_CASE */
export declare type CaseOption = "c" | "l" | "o" | "p" | "u";
/**
 * "c" camelCase |
 * "k" kebab-case |
 * "l" lower_case |
 * "o" original (db) |
 * "p" PascalCase |
 * "u" UPPER_CASE
 */
export declare type CaseFileOption = "k" | CaseOption;
export interface AutoOptions {
    additional?: any;
    /** Case of file names */
    caseFile?: CaseFileOption;
    /** Case of model names */
    caseModel?: CaseOption;
    /** Case of property names */
    caseProp?: CaseOption;
    /** Close connection after export (default true) */
    closeConnectionAutomatically?: boolean;
    /** Database name */
    database?: string;
    /** Database dialect */
    dialect?: Dialect;
    /** Dialect-specific options */
    dialectOptions?: {
        options?: any;
    };
    /** Where to write the model files */
    directory: string;
    /** Database host */
    host?: string;
    /** Number of spaces or tabs to indent (default 2) */
    indentation?: number;
    /** Model language */
    lang?: LangOption;
    /** Whether to avoid creating alias property in relations */
    noAlias?: boolean;
    /** Whether to skip writing the init-models file */
    noInitModels?: boolean;
    /** Whether to skip writing the files */
    noWrite?: boolean;
    /** Database password */
    password?: string;
    /** Database port */
    port?: number;
    /** Database schema to export */
    schema?: string;
    /** Whether to singularize model names */
    singularize: boolean;
    /** Tables to skip exporting */
    skipTables?: string[];
    /** Whether to indent with spaces instead of tabs (default true) */
    spaces?: boolean;
    /** File where database is stored (sqlite only) */
    storage?: string;
    /** Tables to export (default all) */
    tables?: string[];
    /** Override the types of generated typescript file */
    typeOverrides?: TypeOverrides;
    /** Database username */
    username?: string;
    /** Whether to export views (default false) */
    views?: boolean;
    /** Add additional virtual fields */
    virtualFields?: VirtualFieldsOption;
}
export declare type TSField = {
    special: string[];
    elementType: string;
} & ColumnDescription;
/** Uses Inflector via Sequelize, but appends 's' if plural would be the same as singular.
 * Use `Utils.useInflection({ singularize: fn, pluralize: fn2 })` to configure. */
export declare function pluralize(s: string): string;
/** Uses Inflector via Sequelize.  Use `Utils.useInflection({ singularize: fn, pluralize: fn2 })` to configure. */
export declare function singularize(s: string): string;
/** Change casing of val string according to opt [c|l|o|p|u]  */
export declare function recase(opt: CaseOption | CaseFileOption | undefined, val: string | null, singular?: boolean): string;
export interface VirtualFieldsColumnOptions {
    type: string;
}
export declare type TableVirtualFields = {
    [columnName: string]: VirtualFieldsColumnOptions;
};
export declare type VirtualFieldsOption = {
    [tableName: string]: TableVirtualFields;
};
/**
 * @type Optional. Name of the type
 * @source Optional. File path of the type relative to file in the directory.
 *         Leave undefined if overriding with primitive types
 * @isDefault Optional. Whether the type is an export default. Default false
 * @isOptional Optional. Override optionality
 */
export interface ColumnTypeOverride {
    type?: string;
    source?: string;
    isDefault?: boolean;
    isOptional?: boolean;
}
export declare type TableTypeOverride = {
    [columnName: string]: ColumnTypeOverride | undefined;
};
export declare type TableTypeOverrides = {
    [tableName: string]: TableTypeOverride | undefined;
};
export declare type NullableFieldTypes = "NULL" | "OPTIONAL" | "NULL_AND_OPTIONAL";
/**
 * @tables {
 *  roles: {
 *   name: {
 *     type: "RoleTypes",
 *     source: "../RoleTypes"
 *   }
 *  }
 * }
 * @nullableFieldType use "NULL", "OPTIONAL", OR "NULL_AND_OPTIONAL" for nullable table columns. Default "NULL_AND_OPTIONAL"
 */
export interface TypeOverrides {
    tables?: TableTypeOverrides;
    nullableFieldType?: NullableFieldTypes;
}
