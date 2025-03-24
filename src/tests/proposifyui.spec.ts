import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import { HomePage } from '../pages/HomePage';
import { CreateDocumentPage } from '../pages/CreateDocumentPage';
import path from 'path';
  
test('Create a document and reorder a row after inserting a pricing table,', async ({ page }) => {
  try {
    // Navigate to the login page
    const loginPage = await LoginPage.getInstance(page);
    await loginPage.navigateToLoginPage();

    // Get the instance of the login page
    await loginPage.loginToProposify();

    const homePage = await HomePage.getInstance(page);
    await homePage.createNewDocument('Try Editor 3.0');
    await homePage.selectTemplate();

    let createDocumentPage = await CreateDocumentPage.getInstance(page);
    await createDocumentPage.draggingPricingTableInDocument();
    await createDocumentPage.fillNameColumn();

    // Get all rows before dragging
    let allRowsBefore = await page.locator('.MuiDataGrid-cell[data-field="column1"] .py-mui-tiptap-input p').all(); 
    const rowToDragContent = await allRowsBefore[1].textContent();    

    // Drag the row
    await createDocumentPage.dragRow(1, 2);
    let allRowsAfter = await page.locator('.MuiDataGrid-cell[data-field="column1"] .py-mui-tiptap-input p').all(); 
    expect(allRowsAfter.length).toBe(allRowsBefore.length);

    // Verify dragged row is in correct position
    const newPositionContent = await allRowsAfter[2].textContent();
    expect(newPositionContent).toBe(rowToDragContent);

  } catch (error) {
    console.error('Create a document and reorder a row after inserting a pricing table:', error);
    throw error;  
  }
});