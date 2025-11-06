import { useState, useEffect, useCallback, useRef } from 'react';
import { Droplet, DifficultyConfig } from '../types';
import { createDroplet } from '../utils/gameLogic';
import { GAME_CONFIG } from '../constants';

interface UseDropletsProps {
  isPlaying: boolean;
  config: DifficultyConfig;
  onDropletReachBottom: () => void;
}

export const useDroplets = ({ isPlaying, config, onDropletReachBottom }: UseDropletsProps) => {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [recentProblems, setRecentProblems] = useState<string[]>([]);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(0);

  // 최근 문제 중복 체크
  const isProblemRecent = useCallback((multiplicand: number, multiplier: number): boolean => {
    const problemKey = `${multiplicand}x${multiplier}`;
    return recentProblems.includes(problemKey);
  }, [recentProblems]);

  // 새 물방울 생성 (중복 방지)
  const spawnDroplet = useCallback(() => {
    if (droplets.length >= config.maxDroplets) return;

    let attempts = 0;
    let newDroplet: Droplet;
    
    // 최근 5개 문제와 중복되지 않는 문제 생성 (최대 10회 시도)
    do {
      newDroplet = createDroplet(config, GAME_CONFIG.CANVAS_WIDTH);
      attempts++;
    } while (
      attempts < 10 && 
      isProblemRecent(newDroplet.multiplicand, newDroplet.multiplier)
    );

    setDroplets(prev => [...prev, newDroplet]);
    
    // 최근 문제 목록 업데이트 (최대 5개)
    const problemKey = `${newDroplet.multiplicand}x${newDroplet.multiplier}`;
    setRecentProblems(prev => {
      const updated = [problemKey, ...prev];
      return updated.slice(0, 5);
    });
  }, [droplets.length, config, isProblemRecent]);

  // 물방울 업데이트 (애니메이션)
  const updateDroplets = useCallback((timestamp: number) => {
    if (!isPlaying) return;

    // 물방울 생성
    if (timestamp - lastSpawnTimeRef.current > config.spawnInterval) {
      spawnDroplet();
      lastSpawnTimeRef.current = timestamp;
    }

    // 물방울 이동
    setDroplets(prev => {
      const updated = prev.map(droplet => ({
        ...droplet,
        y: droplet.y + droplet.speed,
      }));

      // 바닥에 닿은 물방울 제거 및 생명력 감소
      const remaining = updated.filter(droplet => {
        if (droplet.y > GAME_CONFIG.CANVAS_HEIGHT) {
          onDropletReachBottom();
          return false;
        }
        return true;
      });

      return remaining;
    });

    animationFrameRef.current = requestAnimationFrame(updateDroplets);
  }, [isPlaying, config.spawnInterval, spawnDroplet, onDropletReachBottom]);

  // 정답 체크 및 물방울 제거
  const checkAnswer = useCallback((answer: number): { correct: boolean; droplet?: Droplet } => {
    const matchedDroplet = droplets.find(d => d.answer === answer);
    
    if (matchedDroplet) {
      setDroplets(prev => prev.filter(d => d.id !== matchedDroplet.id));
      return { correct: true, droplet: matchedDroplet };
    }
    
    return { correct: false };
  }, [droplets]);

  // 현재 화면에 있는 문제 가져오기
  const getCurrentProblem = useCallback((): Droplet | null => {
    // 가장 아래에 있는 물방울 선택
    if (droplets.length === 0) return null;
    return droplets.reduce((lowest, current) => 
      current.y > lowest.y ? current : lowest
    );
  }, [droplets]);

  // 애니메이션 시작
  useEffect(() => {
    if (isPlaying) {
      lastSpawnTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(updateDroplets);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateDroplets]);

  // 게임 초기화
  const reset = useCallback(() => {
    setDroplets([]);
    setRecentProblems([]);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  return {
    droplets,
    checkAnswer,
    getCurrentProblem,
    reset,
  };
};

