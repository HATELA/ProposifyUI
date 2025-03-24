import { expect, Locator, Page } from '@playwright/test';
import path from 'path';

export class CreateDocumentPage {
  private page: Page;
  
  // Selectors
  user_dropdown_selector: string = '[class*="ant-dropdown avatar-dropdown ant-dropdown-placement-bottomRight "]';
  drag_cell_selector: string = '[class="MuiDataGrid-rowReorderCell MuiDataGrid-rowReorderCell--draggable"]';
  notification_selector: string = '[class="ant-typography proposify-typography default-font desktop"]';
  edit_content_selector: string = '[data-testid="resizable-block-wrapper"]';
  edit_textbox_selector: string = '[data-testid="editor-page"]';
  pricing_table_selector: string = '[data-testid="pricing-table-block-button"]';
  cell_textbox_selector: string = '[data-testid="render-cell-test"]';
  
  // Instance locators
  user_icon: Locator;
  table_content: Locator;
  content_tab: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  private async initialize() {
    // Initialize locators
    this.user_icon = this.page.locator('[data-testid="avatar-button"]');
    this.table_content = this.page.locator('[data-testid="table-block-button"]');
    this.content_tab = this.page.locator('[data-node-key="content_tab"]');
  }

  static async getInstance(page: Page) {
    const instance = new CreateDocumentPage(page);
    await instance.initialize();
    return instance;
  }


  async draggingPricingTableInDocument() {
    // Click on + icon to add content
    await this.page.waitForTimeout(5000);
    await this.content_tab.waitFor();
    await expect(this.content_tab).toBeVisible();
    await this.content_tab.click();
  
    // Click on table content button
    await expect(this.table_content).toBeVisible();
    await this.table_content.click();
    const pricingTableButton = this.page.locator(this.pricing_table_selector);
  
    const editorArea = this.page.locator(this.edit_textbox_selector);
    await expect(editorArea).toBeVisible();
  
    const editorBounds = await editorArea.boundingBox();
    if (!editorBounds) {
      throw new Error("Editor bounds could not be determined.");
    }
  
    // Drag Pricing Table into editor
    await pricingTableButton.dragTo(editorArea, {
      targetPosition: { x: 0, y: editorBounds.height / 2 }
    });
  }
  
  async fillNameColumn() {
    // First click the table header with wait
    await this.page.getByText('TextMultiplierPriceSubtotalNameQuantityPriceSubtotalSubtotal $0Tax %Discount$').waitFor({ state: 'visible' });
    await this.page.getByText('TextMultiplierPriceSubtotalNameQuantityPriceSubtotalSubtotal $0Tax %Discount$').dblclick();
 
    // Loop to add 4 names
    for (let i: number = 1; i <= 4; i++) {
        // Wait for and click empty paragraph
        await this.page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).waitFor({ state: 'visible', timeout: 5000 });
        
        // For first 3 items
        await this.page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).dblclick();
            
        // Wait for textbox to be ready
        await this.page.getByTestId('table-block-test-id').getByRole('textbox').waitFor({ state: 'visible', timeout: 5000 });
        await this.page.getByTestId('table-block-test-id').getByRole('textbox').getByRole('paragraph').dblclick();
            
        // Fill in the name and wait for input to complete
        await this.page.getByTestId('table-block-test-id').getByRole('textbox').fill(`Name ${i}`);
        // Small delay to ensure value is saved
        await this.page.waitForTimeout(300);
    }
    // To remove focus from last entered text
    //await this.page.locator('[data-testid="tiptap-wrapper-footer"] .tiptap p').isVisible();
    await this.page.getByTestId('title-subtotal').getByText('Subtotal').click();
  }
  
  async dragRow(source: number, target: number) {
    // Retrieve all row elements that can be dragged
    const draggableRows = await this.page.locator('div.MuiDataGrid-rowReorderCell--draggable').all();

    if (source < 0 || source >= draggableRows.length ||
        target < 0 || target >= draggableRows.length) {
      throw new Error("Please enter correct source and target");
    }

    // Log elements to console
    console.log('Source element:', draggableRows[source]);
    console.log('Target element:', draggableRows[target]);
    // Then attempt drag

    // Perform drag-and-drop action between the source and target rows
    // The cold wait of 2 seconds to make the drag drop more robust and less prone to failure
    await draggableRows[source].hover();
    await this.page.mouse.down();
    await this.page.waitForTimeout(2000);
    await draggableRows[target].hover();
    await this.page.mouse.up();
    await this.page.waitForTimeout(2000);
  }
}
