import DotsHorizontalIcon from '@/icons/DotsHorizontalIcon';
import router from 'next/router';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import PlanCardDropdown from './PlanCardDropdown';

export type PlanCardProps = {
  id: string;
  name: string;
  major: string;
};

export default function PlanCard({ id, name, major }: PlanCardProps) {
  const handlePlanClick = () => {
    router.push(`/app/plans/${id}`);
  };

  const utils = trpc.useContext();
  const deletePlan = trpc.plan.deletePlanById.useMutation({
    async onSuccess() {
      await utils.plan.invalidate();
      setDeleting(false);
    },
  });

  const [deleting, setDeleting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <div className="relative w-full rounded-2xl border-b-[12px] border-[#A3A3A3] border-b-primary bg-white text-[#1C2A6D] transition-all hover:scale-110 hover:border-b-[0px] hover:bg-primary hover:text-white">
        <button
          onClick={handlePlanClick}
          className="flex h-[180px] w-full flex-col py-6 px-8 text-left"
        >
          <div className="flex w-full flex-row items-center justify-between">
            <h4 className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-normal ">
              {major}
            </h4>
            <button
              className="dropdown h-fit w-fit"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PlanCardDropdown deletePlan={() => setOpenDeleteModal(true)}>
                <button
                  aria-label="Customise options"
                  className="h-10 w-10 self-stretch rounded-full hover:bg-neutral-200 hover:text-black"
                >
                  <DotsHorizontalIcon className="m-auto rotate-90" />
                </button>
              </PlanCardDropdown>
              <DeleteModal
                open={openDeleteModal}
                onOpenChange={(open) => setOpenDeleteModal(open)}
                deletePlan={() => {
                  setDeleting(true);
                  deletePlan.mutateAsync(id);
                }}
                deleteLoading={deleting}
              />
            </button>
          </div>
          <div className="flex flex-grow items-center text-xl font-semibold">{name}</div>
        </button>
      </div>
    </>
  );
}
