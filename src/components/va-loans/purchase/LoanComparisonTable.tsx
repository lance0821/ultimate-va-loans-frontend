'use client';

import { Info, Check, X } from 'lucide-react';
// Create basic table components
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className="w-full caption-bottom text-sm" {...props}>
    {children}
  </table>
);

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="[&_tr]:border-b" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </td>
);
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { LOAN_COMPARISON_DATA } from '@/lib/constants/loan-comparison-data';
import { cn } from '@/lib/utils';

export default function LoanComparisonTable() {
  const renderCellContent = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <X className="h-5 w-5 text-red-600" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="w-full overflow-x-auto">
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Feature</TableHead>
              <TableHead className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <Badge className="bg-blue-600">VA Loan</Badge>
                  <span className="text-xs font-normal text-gray-500">Your Benefit</span>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <span>Conventional</span>
                  <span className="text-xs font-normal text-gray-500">Traditional Loan</span>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <span>FHA</span>
                  <span className="text-xs font-normal text-gray-500">Government-Backed</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOAN_COMPARISON_DATA.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {row.feature}
                    {row.tooltip && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{row.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className={cn(
                    'inline-flex items-center justify-center',
                    typeof row.vaLoan === 'string' && row.vaLoan.includes('0%') && 'font-semibold text-green-600'
                  )}>
                    {renderCellContent(row.vaLoan)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {renderCellContent(row.conventional)}
                </TableCell>
                <TableCell className="text-center">
                  {renderCellContent(row.fha)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  );
}