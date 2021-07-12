import { Select } from "antd";
import React from "react";
import { Raw } from "../types";

// 透過React.ComponentProps取得組件會接收的所有props的類型
type SelectProps = React.ComponentProps<typeof Select>;

// 將SelectProps中所有與自訂類型重名的屬性刪除，否則會造成衝突
interface IdSelectProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | "defaultOptionName" | "options"
  > {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

// 轉換成數字，不是數字的話，返回0，否則返回轉換過後的數字
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

/*
 * 自定義select組件:
 * - 可以接收任何類型的value
 * - onChange的回調函數的參數指會接收到number類型或undefined
 * - defaultOptionName作為默認選項的名字
 * - options為自訂的選項
 * */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      {...restProps}
      value={options?.length ? toNumber(value) : 0}
      // antd的onChange會自動接收到value不用再展開
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => {
        return (
          <Select.Option value={option.id} key={option.id}>
            {option.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};
