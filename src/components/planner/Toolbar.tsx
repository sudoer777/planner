import AddFileIcon from '@/icons/AddFileIcon';
import DownloadIcon from '@/icons/DownloadIcon';
import EditIcon from '@/icons/EditIcon';
import { FC } from 'react';
import Button from '../Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSemestersContext } from './SemesterContext';
import SortByDropdown from './SortByDropdown';
import DegreePlanPDF from './DegreePlanPDF/DegreePlanPDF';

export interface ToolbarProps {
  title: string;
  major: string;
  studentName: string;
}

const Toolbar: FC<ToolbarProps> = ({ title, major, studentName }) => {
  const { semesters } = useSemestersContext();
  return (
    <section className="flex w-full flex-col justify-center gap-y-6">
      <article className="flex justify-between">
        <h1 className="text-4xl font-semibold text-primary-900">{title}</h1>
        <div className="flex gap-3 items-center">
          <SortByDropdown />
          <Button size="large" icon={<AddFileIcon className="h-6 w-5" />} />
          <Button size="large" icon={<DownloadIcon />}>
            <PDFDownloadLink
              document={
                <DegreePlanPDF studentName={studentName} planTitle={title} semesters={semesters} />
              }
            >
              <span className="whitespace-nowrap">Export Degree Plan</span>
            </PDFDownloadLink>
          </Button>
        </div>
      </article>

      <article className="flex justify-between">
        <button className="flex items-center gap-x-3 rounded-2xl bg-primary-100 p-3">
          <span className="text-xl font-semibold text-primary-800">{major}</span>
          <EditIcon className="text-primary-800" />
        </button>
      </article>
    </section>
  );
};

export default Toolbar;
