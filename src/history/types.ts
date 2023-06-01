
export interface IEqualsComparer<T> {
    (a: T, b: T): boolean;
}
declare function identityComparer(a: any, b: any): boolean;
declare function structuralComparer(a: any, b: any): boolean;
declare function shallowComparer(a: any, b: any): boolean;
declare function defaultComparer(a: any, b: any): boolean;
export declare const comparer: {
    identity: typeof identityComparer;
    structural: typeof structuralComparer;
    default: typeof defaultComparer;
    shallow: typeof shallowComparer;
};
export {};

export interface IReactionDisposer {
    (): void;
    $mobx: any;
}

export interface IReactionPublic {
    dispose(): void;
    trace(enterBreakPoint?: boolean): void;
}

export interface IAutorunOptions {
    delay?: number;
    name?: string;
    /**
     * Experimental.
     * Warns if the view doesn't track observables
     */
    requiresObservable?: boolean;
    scheduler?: (callback: () => void) => any;
    onError?: (error: any) => void;
}
/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
export declare function autorun(view: (r: IReactionPublic) => any, opts?: IAutorunOptions): IReactionDisposer;
export declare type IReactionOptions<T, FireImmediately extends boolean> = IAutorunOptions & {
    fireImmediately?: FireImmediately;
    equals?: IEqualsComparer<T>;
};
export declare function reaction<T, FireImmediately extends boolean = false>(expression: (r: IReactionPublic) => T, effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T, r: IReactionPublic) => void, opts?: IReactionOptions<T, FireImmediately>): IReactionDisposer;

export declare function untracked<T>(action: () => T): T;

export interface IPublicTypeDisposable {
    (): void;
  }

export interface IPublicModelHistory {

    /**
     * 历史记录跳转到指定位置
     * go to a specific history
     * @param cursor
     */
    go(cursor: number): void;
  
    /**
     * 历史记录后退
     * go backward in history
     */
    back(): void;
  
    /**
     * 历史记录前进
     * go forward in history
     */
    forward(): void;
  
    /**
     * 保存当前状态
     * do save current change as a record in history
     */
    savePoint(): void;
  
    /**
     * 当前是否是「保存点」，即是否有状态变更但未保存
     * check if there is unsaved change for history
     */
    isSavePoint(): boolean;
  
    /**
     * 获取 state，判断当前是否为「可回退」、「可前进」的状态
     * get flags in number which indicat current change state
     *
     *  |    1     |     1    |    1     |
     *  | -------- | -------- | -------- |
     *  | modified | redoable | undoable |
     * eg.
     *  7 means : modified && redoable && undoable
     *  5 means : modified && undoable
     */
    getState(): number;
  
    /**
     * 监听 state 变更事件
     * monitor on stateChange event
     * @param func
     */
    onChangeState(func: () => any): IPublicTypeDisposable;
  
    /**
     * 监听历史记录游标位置变更事件
     * monitor on cursorChange event
     * @param func
     */
    onChangeCursor(func: () => any): IPublicTypeDisposable;
  }
  export type IPublicTypeNodeData = any;
  export type IPublicTypePropsMap = any;

  export interface IPublicTypeNodeSchema {
    id?: string;
    /**
     * 组件名称 必填、首字母大写
     */
    componentName: string;
    /**
     * 组件属性对象
     */
    props?: {
      children?: IPublicTypeNodeData | IPublicTypeNodeData[];
    } & IPublicTypePropsMap; // | PropsList;
  
    /**
     * 组件属性对象
     */
    leadingComponents?: string;
    /**
     * 渲染条件
     */
    condition?: IPublicTypeCompositeValue;
    /**
     * 循环数据
     */
    loop?: IPublicTypeCompositeValue;
    /**
     * 循环迭代对象、索引名称 ["item", "index"]
     */
    loopArgs?: [string, string];
    /**
     * 子节点
     */
    children?: IPublicTypeNodeData | IPublicTypeNodeData[];
    /**
     * 是否锁定
     */
    isLocked?: boolean;
  
    // @todo
    // ------- future support -----
    conditionGroup?: string;
    title?: string;
    ignore?: boolean;
    locked?: boolean;
    hidden?: boolean;
    isTopFixed?: boolean;
  
    /** @experimental 编辑态内部使用 */
    __ctx?: any;
  }