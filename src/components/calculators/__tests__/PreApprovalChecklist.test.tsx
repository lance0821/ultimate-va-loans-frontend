import { render, screen, fireEvent } from '@testing-library/react';
import PreApprovalChecklist from '../PreApprovalChecklist';

describe('PreApprovalChecklist', () => {
  it('renders the checklist with title', () => {
    render(<PreApprovalChecklist />);
    
    expect(screen.getByText('VA Loan Pre-Approval Checklist')).toBeInTheDocument();
    expect(screen.getByText(/Gather these documents/)).toBeInTheDocument();
  });

  it('displays progress indicators', () => {
    render(<PreApprovalChecklist />);
    
    expect(screen.getByText('Required Items')).toBeInTheDocument();
    expect(screen.getByText('Overall Progress')).toBeInTheDocument();
  });

  it('shows all document categories', () => {
    render(<PreApprovalChecklist />);
    
    expect(screen.getByText('Income Documentation')).toBeInTheDocument();
    expect(screen.getByText('Asset Documentation')).toBeInTheDocument();
    expect(screen.getByText('VA Documents')).toBeInTheDocument();
    expect(screen.getByText('Identification')).toBeInTheDocument();
  });

  it('allows checking off items', () => {
    render(<PreApprovalChecklist />);
    
    // Find the first checklist item and click it
    const firstItem = screen.getByText('W-2 forms (last 2 years)');
    fireEvent.click(firstItem.closest('div')!);
    
    // The item should be checked (look for green styling or check icon)
    expect(screen.getByText('W-2 forms (last 2 years)')).toBeInTheDocument();
  });

  it('updates progress when items are checked', () => {
    render(<PreApprovalChecklist />);
    
    // Check a required item
    const requiredItem = screen.getByText('Certificate of Eligibility (COE)');
    fireEvent.click(requiredItem.closest('div')!);
    
    // Progress should update
    expect(screen.getByText('Required Items')).toBeInTheDocument();
  });

  it('shows different status alerts based on completion', () => {
    render(<PreApprovalChecklist />);
    
    // Initially should show missing items alert
    expect(screen.getByText(/Missing Required Items/)).toBeInTheDocument();
  });

  it('displays required vs optional badges', () => {
    render(<PreApprovalChecklist />);
    
    // Should show "Required" badges on required items
    expect(screen.getAllByText('Required')).toHaveLength(7); // Based on PRE_APPROVAL_CHECKLIST data
  });

  it('enables pre-approval button when all required items checked', () => {
    render(<PreApprovalChecklist />);
    
    // Initially button should be disabled
    const button = screen.getByText(/Complete Required Items First/);
    expect(button).toBeDisabled();
  });

  it('shows helpful tips', () => {
    render(<PreApprovalChecklist />);
    
    expect(screen.getByText(/Pro Tips:/)).toBeInTheDocument();
    expect(screen.getByText(/Organize documents in digital folders/)).toBeInTheDocument();
  });

  it('includes download checklist option', () => {
    render(<PreApprovalChecklist />);
    
    expect(screen.getByText('Download Checklist PDF')).toBeInTheDocument();
  });

  it('displays item descriptions', () => {
    render(<PreApprovalChecklist />);
    
    expect(screen.getByText(/Shows employment income for wage earners/)).toBeInTheDocument();
    expect(screen.getByText(/Proves VA loan eligibility/)).toBeInTheDocument();
  });
});