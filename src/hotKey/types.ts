
export const innerHotkeySymbol = Symbol('innerHotkey');

export const hotkeySymbol = Symbol('hotkey');


export interface IPublicTypeDisposable {
    (): void;
  }


export type IPublicTypeHotkeyCallback = (e: KeyboardEvent, combo?: string) => any | false;

export interface IPublicTypeHotkeyCallbackConfig {
  callback: IPublicTypeHotkeyCallback;
  modifiers: string[];
  action: string;
  seq?: string;
  level?: number;
  combo?: string;
}


export interface IPublicTypeHotkeyCallbacks {
  [key: string]: IPublicTypeHotkeyCallbackConfig[];
}


export interface IPublicApiHotkey {

  /**
   * 获取当前快捷键配置
   *
   * @experimental
   * @since v1.1.0
   */
  get callbacks(): IPublicTypeHotkeyCallbacks;

  /**
   * 绑定快捷键
   * bind hotkey/hotkeys,
   * @param combos 快捷键，格式如：['command + s'] 、['ctrl + shift + s'] 等
   * @param callback 回调函数
   * @param action
   */
  bind(
      combos: string[] | string,
      callback: IPublicTypeHotkeyCallback,
      action?: string,
    ): IPublicTypeDisposable;
}
