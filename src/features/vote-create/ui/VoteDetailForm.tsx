import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useElectionFormMode, useVoteCreateContext } from '../model';
import type { ElectionAllData } from '../types';
import { VoteButton, VoteCandidateForm, VoteInput } from '.';
import { useEffect, useState } from 'react';

interface VoteDetailFormProps {
  teamName: string;
  watch: UseFormWatch<ElectionAllData>;
  register: UseFormRegister<ElectionAllData>;
  setValue: UseFormSetValue<ElectionAllData>;
}

export default function VoteDetailForm({
  teamName,
  watch,
  register,
  setValue,
}: VoteDetailFormProps) {
  const { isCandidateMode, setIsCandidateMode, setNomineeKey, candidateKey } =
    useVoteCreateContext();

  const { isNomineeValid } = useElectionFormMode({
    register,
    watch,
    setValue,
  });
  const [pledge, setPledge] = useState<string[]>([]);

  useEffect(() => {
    setPledge([]);
  }, [candidateKey]);

  useEffect(() => {
    if (pledge.length > 0) {
      setValue(`${candidateKey}.info.description`, pledge.join('\n'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pledge]);

  const handleCandidateButtonClick = (isMainCandidate: boolean) => {
    setNomineeKey(isMainCandidate ? 'nominee1' : 'nominee2');
    setIsCandidateMode(true);
  };

  const candidateButtons = [
    {
      label: '정후보자',
      isMain: true,
    },
    {
      label: '부후보자',
      isMain: false,
    },
  ];

  return (
    <>
      {isCandidateMode ? (
        <VoteCandidateForm watch={watch} register={register} />
      ) : (
        <>
          <div className="mt-11 flex flex-col items-start text-lg font-semibold">
            <p>
              <span className="text-m">'{teamName}'</span> 선거운동본부
            </p>
            <p>후보자를 입력해주세요</p>
          </div>
          <div className="text-s mt-[18px] flex w-full flex-col gap-[14px]">
            {candidateButtons.map(({ label, isMain: isMainCandidate }) => (
              <VoteButton
                key={label + candidateKey}
                label={label}
                onClick={() => handleCandidateButtonClick(isMainCandidate)}
                done={isNomineeValid(
                  candidateKey,
                  isMainCandidate ? 'nominee1' : 'nominee2',
                )}
              />
            ))}
            {pledge.map((item, index) => (
              <VoteInput
                key={index}
                placeholder={`핵심 공약 ${index + 1}`}
                value={item}
                onChange={e => {
                  setPledge(prev => {
                    const newPledge = [...prev];
                    newPledge[index] = e.target.value;
                    return newPledge;
                  });
                }}
              />
            ))}
            <VoteButton
              plus
              label={`공약 추가하기 ${pledge.length}/7`}
              type="button"
              className="text-s border-[#F2F3F5] bg-[#F2F3F5]"
              onClick={() => {
                if (pledge.length < 7) setPledge([...pledge, '']);
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
