'use client';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from './Button';
import { ResultType } from '@/app/result/page';
import Chart from './Chart';
import { Member } from '@/model/member';
import { calculateTotalData, description } from '@/util/result';

interface ResultProps {
  result: ResultType;
  teamResult: Pick<Member, 'nickname' | 'score'>[];
}

export default function ResultForm({ result, teamResult }: ResultProps) {
  const router = useRouter();

  const team = useStore((state) => state.team);
  const total = useStore((state) => state.total);
  const nickname = useStore((state) => state.nickname);

  const totalData = calculateTotalData(teamResult);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='mt-14 mb-4'>
      <div className='text-center mb-6'>
        <div className='mb-4 text-lg'>
          <b>{nickname}님</b>께서 생각하시는 <b>이길영</b> 지원자는?
        </div>
        <div className='font-bold text-xl mb-6'>
          {description(total, result)}
        </div>
        <div>같은 팀의 결과를 확인해 보세요!</div>
      </div>
      <Chart
        title={`${team} Team's Results`}
        databases={[
          {
            label: '팀원 수',
            data: totalData,
            backgroundColor: 'rgba(0, 255, 72, 0.2)',
            borderColor: 'rgb(11, 107, 0)',
            borderWidth: 1,
          },
        ]}
        labels={['강추! 😆', '추천 😁', '고려 🤔']}
      />
      <section className='flex justify-center mt-10'>
        <Button text='홈으로' className='w-20 h-10' onClick={handleGoHome} />
      </section>
    </div>
  );
}
