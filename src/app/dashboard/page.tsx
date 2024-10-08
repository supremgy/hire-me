import Chart from '@/components/Chart';
import React from 'react';
import {
  getTeamAverageScores,
  getTeamCountsByScoreRange,
  getTeamScoreStandardDeviations,
} from '../../util/chart';
import { Member } from '@/model/member';
import { getAllMembers } from '@/util/member';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashBoardPage() {
  //직원수
  const members: Member[] = await getAllMembers();
  const labels = Array.from(new Set(members.map((member) => member.team)));

  const teamCountsByScoreRange = getTeamCountsByScoreRange(members);
  console.log('teamCountsByScoreRange:', teamCountsByScoreRange);

  const teamAverageScores = getTeamAverageScores(members);
  console.log('teamAverageScores:', teamAverageScores);

  const teamScoreStandardDeviations = getTeamScoreStandardDeviations(members);
  console.log('teamScoreStandardDeviations:', teamScoreStandardDeviations);

  const totalDatabases = [
    {
      label: '강추! 😆',
      data: teamCountsByScoreRange.high,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: '추천 😁',
      data: teamCountsByScoreRange.medium,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      label: '고려 🤔',
      data: teamCountsByScoreRange.low,
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
  ];
  const averageDatabases = [
    {
      label: '평균 점수',
      data: teamAverageScores,
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // 파란색 계열
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ];
  const SDDatabases = [
    {
      label: '표준편차 점수',
      data: teamScoreStandardDeviations,
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // 빨간색 계열
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ];
  return (
    <section className='flex flex-col gap-10 mb-8'>
      <Chart
        title='팀별 의견별 인원 총합 차트'
        labels={labels}
        databases={totalDatabases}
      />
      <Chart
        title='팀별 평균 점수 차트'
        labels={labels}
        databases={averageDatabases}
      />
      <Chart
        title='팀별 표준편차 점수 차트'
        labels={labels}
        databases={SDDatabases}
      />
    </section>
  );
}
