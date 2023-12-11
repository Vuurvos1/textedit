extern crate walkdir;

use walkdir::WalkDir;
use std::path::PathBuf;

// TODO: remove this
pub fn list_markdown_files_in_folder(folder_path: &PathBuf) -> Vec<String> {
    let markdown_files = WalkDir::new(&folder_path)
        .into_iter()
        .filter_map(|entry| {
            let entry = entry.ok()?;
            if entry.file_type().is_file() {
                if let Some(file_name) = entry.file_name().to_str() {
                    if file_name.ends_with(".md") {
                        // entry.path().to_str().map(|s| s.to_string())
                        let s = entry.path().to_str().unwrap();
                        let folder_path = folder_path.to_str().unwrap();
                        let file_name = &s[folder_path.len()..];

                        Some(file_name.to_string())
                    } else {
                        None
                    }
                } else {
                    None
                }
            } else {
                None
            }
        })
        .map(|file| file)
        .collect();

    markdown_files
}
