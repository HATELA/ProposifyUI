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
    await expect(this.content_tab).toBeVisible();
    await this.content_tab.click();
  
    // Click on table content button
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
    const names = ['Name 1', 'Name 2', 'Name 3', 'Name 4'];
  
    for (let i = 0; i < names.length; i++) {
      const textbox = this.page.getByTestId('table-block-test-id').getByRole('textbox');
      const emptyParagraph = this.page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1);
      const paragraphInTextbox = textbox.getByRole('paragraph');
  
      // Ensure textbox is visible and interactable
      await expect(textbox).toBeVisible();
      await textbox.click({ force: true });
  
      // Fill the name
      await textbox.fill(names[i]);
  
      // Click outside to trigger blur/save
      await expect(emptyParagraph).toBeVisible();
      await emptyParagraph.click({ force: true });
  
      // Re-focus for the next input
      await expect(paragraphInTextbox).toBeVisible();
      await paragraphInTextbox.click({ force: true });
    }
  
    // Final blur action to confirm the last input
    const finalGridCellParagraph = this.page
      .getByRole('gridcell', { name: 'Write text here...' })
      .getByRole('paragraph');
    const finalEmptyParagraph = this.page
      .getByTestId('table-block-test-id')
      .getByRole('paragraph')
      .filter({ hasText: /^$/ });
  
    await expect(finalGridCellParagraph).toBeVisible();
    await finalGridCellParagraph.click({ force: true });
  
    await expect(finalEmptyParagraph).toBeVisible();
    await finalEmptyParagraph.click({ force: true });
  }

  async dragRow(source: number, target: number) {
    // Retrieve all row elements that can be dragged
    const draggableRows = await this.page.locator('.MuiDataGrid-row:not(.py-header-row)').all();

    if (source < 0 || source >= draggableRows.length ||
        target < 0 || target >= draggableRows.length) {
      throw new Error("Please enter correct source and target");
    }

    // Perform drag-and-drop action between the source and target rows
    await draggableRows[source].dragTo(draggableRows[target]), { force: true };
  }
}
