import React, { useState, useCallback } from "react";
import FilterInput from "./FilterInput";
import type { FilterCriteria } from "../constants/filterCriteria";
import type { Category } from "../constants/categoryMap";

interface DetailFilterProps {
  onFilterChange?: (filters: FilterCriteria) => void;
  selectedCategory?: Category | null;
}

function DetailFilter({ onFilterChange, selectedCategory }: DetailFilterProps) {
  const armorCategories = [
    "천옷",
    "경갑옷",
    "중갑옷",
    "모자/가발",
    "방패",
    "신발",
    "장갑",
    "날개",
    "꼬리",
    "로브",
    "액세서리",
    "얼굴 장식",
  ];
  const isArmor = selectedCategory && armorCategories.includes(selectedCategory.label);
  
  // 무기/일반 아이템용 필드 (방어구가 아닐 경우)
  const [minAttack, setMinAttack] = useState<number | "">("");
  const [maxAttack, setMaxAttack] = useState<number | "">("");
  const [minWoundRate, setMinWoundRate] = useState<number | "">("");
  const [maxWoundRate, setMaxWoundRate] = useState<number | "">("");
  const [minCritical, setMinCritical] = useState<number | "">("");
  const [maxCritical, setMaxCritical] = useState<number | "">("");
  const [minBalance, setMinBalance] = useState<number | "">("");
  const [maxBalance, setMaxBalance] = useState<number | "">("");
  const [minErg, setMinErg] = useState<number | "">("");
  const [maxErg, setMaxErg] = useState<number | "">("");

  // 방어구 전용 필드: 단일 숫자 입력 (최소/최대가 아닌 한 값)
  const [defense, setDefense] = useState<number | "">("");
  const [protection, setProtection] = useState<number | "">("");
  const [magicDefense, setMagicDefense] = useState<number | "">("");
  const [magicProtection, setMagicProtection] = useState<number | "">("");

  // 공통 필드 (내구력, 인챈트, 에르그, 특별 개조, 색상, 세공, 세트 효과, 남은 전용 해제 횟수)
  const [minDurability, setMinDurability] = useState<number | "">("");
  const [maxDurability, setMaxDurability] = useState<number | "">("");

  const [enchantPrefix, setEnchantPrefix] = useState("");
  const [enchantSuffix, setEnchantSuffix] = useState("");


  const [specialUpgradeType, setSpecialUpgradeType] = useState<"R" | "S">("R");
  const [specialUpgradeR, setSpecialUpgradeR] = useState<number | "">("");
  const [specialUpgradeS, setSpecialUpgradeS] = useState<number | "">("");

  // 색상: 각 파트별 R/G/B (문자열로 관리)
  type ColorRGB = {
    r: string;
    g: string;
    b: string;
  };

  const [colorPartA, setColorPartA] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartB, setColorPartB] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartC, setColorPartC] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartD, setColorPartD] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartE, setColorPartE] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartF, setColorPartF] = useState<ColorRGB>({ r: "", g: "", b: "" });

  // 세공: 랭크 및 옵션 최대 3개
  const [sewingRank, setSewingRank] = useState<number | "">("");
  const [sewingOptions, setSewingOptions] = useState<string[]>([""]);
  const updateSewingOption = useCallback((index: number, newValue: string) => {
    setSewingOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = newValue;
      return newOptions;
    });
  }, []);

  // 세트 효과
  const [setEffect, setSetEffect] = useState("");

  // 남은 전용 해제 횟수
  const [remainingExclusive, setRemainingExclusive] = useState<number | "">("");

  // 필터 적용 버튼 클릭 시
  const handleApplyFilter = useCallback(() => {
    const filters: FilterCriteria = {};

    if (isArmor) {
      // 방어구 카테고리일 경우 단일 값 입력으로 필터 적용
      if (defense !== "") filters.defense = defense;
      if (protection !== "") filters.protection = protection;
      if (magicDefense !== "") filters.magicDefense = magicDefense;
      if (magicProtection !== "") filters.magicProtection = magicProtection;
    } else {
      // 방어구가 아닌 경우 기존 무기 관련 필터(최소/최대)
      if (minAttack !== "") filters.minAttack = minAttack;
      if (maxAttack !== "") filters.maxAttack = maxAttack;
      if (minWoundRate !== "") filters.minWoundRate = minWoundRate;
      if (maxWoundRate !== "") filters.maxWoundRate = maxWoundRate;
      if (minCritical !== "") filters.minCritical = minCritical;
      if (maxCritical !== "") filters.maxCritical = maxCritical;
      if (minBalance !== "") filters.minBalance = minBalance;
      if (maxBalance !== "") filters.maxBalance = maxBalance;
    }

    // 공통 필드
    if (minDurability !== "") filters.minDurability = minDurability;
    if (maxDurability !== "") filters.maxDurability = maxDurability;
    if (enchantPrefix) filters.enchantPrefix = enchantPrefix;
    if (enchantSuffix) filters.enchantSuffix = enchantSuffix;
    if (minErg !== "") filters.minErg = minErg;
    if (maxErg !== "") filters.maxErg = maxErg;
    if (specialUpgradeType === "R" && specialUpgradeR !== "") {
      filters.specialUpgradeR = specialUpgradeR;
    } else if (specialUpgradeType === "S" && specialUpgradeS !== "") {
      filters.specialUpgradeS = specialUpgradeS;
    }

    // 색상 필터: state는 string, 필터에서는 number 배열
    if (colorPartA.r !== "") filters.colorPartAR = [Number(colorPartA.r)];
    if (colorPartA.g !== "") filters.colorPartAG = [Number(colorPartA.g)];
    if (colorPartA.b !== "") filters.colorPartAB = [Number(colorPartA.b)];

    if (colorPartB.r !== "") filters.colorPartBR = [Number(colorPartB.r)];
    if (colorPartB.g !== "") filters.colorPartBG = [Number(colorPartB.g)];
    if (colorPartB.b !== "") filters.colorPartBB = [Number(colorPartB.b)];

    if (colorPartC.r !== "") filters.colorPartCR = [Number(colorPartC.r)];
    if (colorPartC.g !== "") filters.colorPartCG = [Number(colorPartC.g)];
    if (colorPartC.b !== "") filters.colorPartCB = [Number(colorPartC.b)];

    if (colorPartD.r !== "") filters.colorPartDR = [Number(colorPartD.r)];
    if (colorPartD.g !== "") filters.colorPartDG = [Number(colorPartD.g)];
    if (colorPartD.b !== "") filters.colorPartDB = [Number(colorPartD.b)];

    if (colorPartE.r !== "") filters.colorPartER = [Number(colorPartE.r)];
    if (colorPartE.g !== "") filters.colorPartEG = [Number(colorPartE.g)];
    if (colorPartE.b !== "") filters.colorPartEB = [Number(colorPartE.b)];

    if (colorPartF.r !== "") filters.colorPartFR = [Number(colorPartF.r)];
    if (colorPartF.g !== "") filters.colorPartFG = [Number(colorPartF.g)];
    if (colorPartF.b !== "") filters.colorPartFB = [Number(colorPartF.b)];

    // 세공
    if (sewingRank !== "") filters.sewingRank = sewingRank;
    if (sewingOptions[0]) filters.sewingOption1 = sewingOptions[0];
    if (sewingOptions[1]) filters.sewingOption2 = sewingOptions[1];
    if (sewingOptions[2]) filters.sewingOption3 = sewingOptions[2];

    // 세트 효과
    if (setEffect) filters.setEffect = setEffect;

    // 남은 전용 해제 횟수
    if (remainingExclusive !== "") filters.remainingExclusive = remainingExclusive;

    // 부모로 필터 전달
    onFilterChange?.(filters);
  }, [
    isArmor,
    defense,
    protection,
    magicDefense,
    magicProtection,
    minAttack,
    maxAttack,
    minWoundRate,
    maxWoundRate,
    minCritical,
    maxCritical,
    minBalance,
    maxBalance,
    minDurability,
    maxDurability,
    enchantPrefix,
    enchantSuffix,
    minErg,
    maxErg,
    specialUpgradeType,
    specialUpgradeR,
    specialUpgradeS,
    colorPartA,
    colorPartB,
    colorPartC,
    colorPartD,
    colorPartE,
    colorPartF,
    sewingRank,
    sewingOptions,
    setEffect,
    remainingExclusive,
    onFilterChange,
  ]);

  return (
    <div>
      <h4 className="font-bold mb-4">상세 검색</h4>

      {isArmor ? (
        // 방어구 카테고리일 경우: 네 가지 단일 값 입력 필드
        <>
          <div>
            <label className="block text-sm mb-1 font-semibold">방어력</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={defense}
              onChange={(value: string) => setDefense(value === "" ? "" : Number(value))}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">보호</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={protection}
              onChange={(value: string) => setProtection(value === "" ? "" : Number(value))}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">마법방어력</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={magicDefense}
              onChange={(value: string) => setMagicDefense(value === "" ? "" : Number(value))}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">마법보호</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={magicProtection}
              onChange={(value: string) => setMagicProtection(value === "" ? "" : Number(value))}
            />
          </div>
        </>
      ) : (
        // 방어구가 아닐 경우: 기존 무기 관련 범위 입력 필드
        <>
          <div>
            <label className="block text-sm mb-1 font-semibold">공격력</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minAttack}
                onChange={(value: string) => setMinAttack(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxAttack}
                onChange={(value: string) => setMaxAttack(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">부상율</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minWoundRate}
                onChange={(value: string) => setMinWoundRate(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxWoundRate}
                onChange={(value: string) => setMaxWoundRate(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">크리티컬</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minCritical}
                onChange={(value: string) => setMinCritical(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxCritical}
                onChange={(value: string) => setMaxCritical(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">밸런스</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minBalance}
                onChange={(value: string) => setMinBalance(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxBalance}
                onChange={(value: string) => setMaxBalance(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">에르그</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minErg}
                onChange={(value: string) => setMinErg(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxErg}
                onChange={(value: string) => setMaxErg(value === "" ? "" : Number(value))}
                className="w-1/2"
              />
            </div>
          </div>
        </>
      )}

      {/* 내구력 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">내구력</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minDurability}
            onChange={(value: string) => setMinDurability(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxDurability}
            onChange={(value: string) => setMaxDurability(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
        </div>
      </div>

      {/* 인챈트 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">인챈트</label>
        <div className="flex gap-2">
          <FilterInput
            type="text"
            placeholder="접두"
            value={enchantPrefix}
            onChange={setEnchantPrefix}
            className="w-1/2"
          />
          <FilterInput
            type="text"
            placeholder="접미"
            value={enchantSuffix}
            onChange={setEnchantSuffix}
            className="w-1/2"
          />
        </div>
      </div>

      {/* 특별 개조 타입 */}
      <div>
        <label htmlFor="specialUpgradeType" className="block text-sm mb-1 font-semibold">
          특별 개조 타입 선택
        </label>
        <select
          id="specialUpgradeType"
          value={specialUpgradeType}
          onChange={(e) => setSpecialUpgradeType(e.target.value as "R" | "S")}
          className="border border-slate-300 rounded px-2 py-1 w-full mb-2"
        >
          <option value="R">특별 개조 (R강)</option>
          <option value="S">특별 개조 (S강)</option>
        </select>
      </div>
      {specialUpgradeType === "R" ? (
        <div>
          <label className="block text-sm mb-1 font-semibold">특별 개조 (R강)</label>
          <FilterInput
            type="number"
            placeholder="0 ~ 7"
            value={specialUpgradeR}
            onChange={(value: string) => setSpecialUpgradeR(value === "" ? "" : Number(value))}
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm mb-1 font-semibold">특별 개조 (S강)</label>
          <FilterInput
            type="number"
            placeholder="0 ~ 7"
            value={specialUpgradeS}
            onChange={(value: string) => setSpecialUpgradeS(value === "" ? "" : Number(value))}
          />
        </div>
      )}

      {/* 파트 A (R/G/B 한 줄) */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 A</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartA.r}
            onChange={(val: string) => setColorPartA((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartA.g}
            onChange={(val: string) => setColorPartA((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartA.b}
            onChange={(val: string) => setColorPartA((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 B */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 B</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartB.r}
            onChange={(val: string) => setColorPartB((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartB.g}
            onChange={(val: string) => setColorPartB((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartB.b}
            onChange={(val: string) => setColorPartB((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 C */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 C</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartC.r}
            onChange={(val: string) => setColorPartC((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartC.g}
            onChange={(val: string) => setColorPartC((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartC.b}
            onChange={(val: string) => setColorPartC((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 D */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 D</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartD.r}
            onChange={(val: string) => setColorPartD((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartD.g}
            onChange={(val: string) => setColorPartD((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartD.b}
            onChange={(val: string) => setColorPartD((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 E */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 E</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartE.r}
            onChange={(val: string) => setColorPartE((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartE.g}
            onChange={(val: string) => setColorPartE((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartE.b}
            onChange={(val: string) => setColorPartE((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 F */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 F</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartF.r}
            onChange={(val: string) => setColorPartF((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartF.g}
            onChange={(val: string) => setColorPartF((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartF.b}
            onChange={(val: string) => setColorPartF((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 세공 랭크 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">세공 랭크</label>
        <FilterInput
          type="number"
          placeholder="예: 1"
          value={sewingRank}
          onChange={(value: string) => setSewingRank(value === "" ? "" : Number(value))}
        />
      </div>

      {/* 세공 옵션 최대 3개 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">세공 옵션</label>
        <div>
          {sewingOptions.map((option, index) => (
            <div key={index} className="w-full">
              <div className="flex gap-2 justify-between">
                <FilterInput
                  type="text"
                  placeholder={`옵션 ${index + 1}`}
                  value={option}
                  onChange={(val: string) => updateSewingOption(index, val)}
                  className="flex-1"
                />
                {sewingOptions.length > 1 && (
                  <button
                    className="text-white text-base w-8 mb-2 rounded bg-red-400"
                    onClick={() => setSewingOptions((prev) => prev.filter((_, i) => i !== index))}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
          {sewingOptions.length < 3 && (
            <button
              className="text-white text-base w-8 h-8 mb-2 rounded bg-blue-400"
              onClick={() => setSewingOptions([...sewingOptions, ""])}
            >
              +
            </button>
          )}
        </div>
        
      </div>

      {/* 세트 효과 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">세트 효과</label>
        <FilterInput
          type="text"
          placeholder="예: 스매시"
          value={setEffect}
          onChange={setSetEffect}
        />
      </div>

      {/* 남은 전용 해제 횟수 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">남은 전용 해제 횟수</label>
        <FilterInput
          type="number"
          placeholder="입력"
          value={remainingExclusive}
          onChange={(value: string) => setRemainingExclusive(value === "" ? "" : Number(value))}
        />
      </div>

      {/* 적용 버튼 */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleApplyFilter}
      >
        적용
      </button>
    </div>
  );
}

export default React.memo(DetailFilter);